/**
 * このライブラリのベースとなる名前空間
 * @namespace
 */
var listtable = listtable || {};

/**
 * テーブルに関する名前空間
 * @namespace
 */
listtable.table = {};

/**
 * テーブルの各要素(jquery要素)
 * @Object
 */
listtable.table.$table = null; // テーブル
listtable.table.$thead = null; // ヘッダー全体
listtable.table.$tbody = null; // ヘッダー以外の行列全体
listtable.table.$th = null; // ヘッダー行
listtable.table.$tr = null; // 行リスト
listtable.table.$tdHead = null; // ヘッダーセル
listtable.table.$td = null; // ヘッダー以外の各セル

/**
 * テーブルの各行のデータ
 * @Object
 */
listtable.table.data = {};

/**
 * listtableの各種設定に関する名前空間
 * @namespace
 */
listtable.settings = {};

/**
 * listtableのデフォルト設定
 * @const
 */
listtable.settings.DEF_SETTINGS = {
  colSettings: null // 列定義 [{id: ..., type, ...}, ...]のJSON配列
}

/**
 * 定義用の名前空間
 * @const
 */
listtable.DEF_STATE = {}

/**
 * 列の型idの定義
 * @const
 */
listtable.DEF_STATE.COL_TYPE = {
  TEXT: 'text',
  NUM: 'num',
  TEXTAREA: 'textarea',
  DATE: 'date',
  HTML: 'html'
}



/**
 * データのソート機能の名前空間
 * @namespace
 */
listtable.sort = {};

/**
 * ソート順昇順を示す定数
 * @const
 */
listtable.sort.ORDER_ASC = 0;

/**
 * ソート順降順を示す定数
 * @const
 */
listtable.sort.ORDER_DESC = 1;

/**
 * Object型の配列をソートする<br/>
 * sortkeysは次のように定義する<br/>
 * [{keyname: 'column1', order:listtable.sort.ORDER_ASC}, {keyname: 'column2', order:listtable.sort.ORDER_DESC}]
 * @param {Array} data - ソートを行うオブジェクト配列
 * @param {Array} sortkeys - ソートのキー、並び順のオブジェクト配列
 * @return {Array} ソートされたdataを返す
 */
listtable.sort.sortObject = function(data, sortkeys) {
  var sortdata = data.concat();
  sortdata.sort(function(a, b) {
    var keylen = sortkeys.length;
    for (var i = 0; i < keylen; i++) {
      var sortkey = sortkeys[i];
      if (!(('order' in sortkey) && ('keyname' in sortkey))) continue;
      if (sortkey.order === listtable.sort.ORDER_ASC) {
        if (a[sortkey.keyname] < b[sortkey.keyname]) return -1;
        if (a[sortkey.keyname] > b[sortkey.keyname]) return 1;
      } else if(sortkey.order === listtable.sort.ORDER_DESC) {
        if (a[sortkey.keyname] > b[sortkey.keyname]) return -1;
        if (a[sortkey.keyname] < b[sortkey.keyname]) return 1;
      }
    }
    return 0;
  });
  return sortdata;
}

/**
 * listtableを既存のタグ構造にセット
 * @param {Object} $table listtableをセットするjquery要素
 * @param {Object} settings listtableの各種設定（プロパティ）
 * @return {Object} listtable.table
 */
listtable.table.set = function($table, settings) {
  // 要素取得 + クラスセット
  listtable.table.$table = $table.addClass('list-table');
  listtable.table.$thead = $table.children('ul').eq(0).addClass('list-table__head');
  listtable.table.$tbody = $table.children('ul').eq(1).addClass('list-table__body');
  listtable.table.$th = listtable.table.$thead.children('li').addClass('list-table__list list-table__list--head');
  listtable.table.$tr = listtable.table.$tbody.children('li').addClass('list-table__list');
  listtable.table.$tdHead = listtable.table.$th.children('span').addClass('list-table__cell list-table__cell--head');
  listtable.table.$td = listtable.table.$tr.children('span').addClass('list-table__cell');

  var colLen = listtable.table.$tdHead.length; // 列数
  var rowLen = listtable.table.$tr.length; // 行数

  // 全般設定
  settings = settings || {};
  listtable.settings = $.extend(listtable.settings.DEF_SETTINGS, settings);

  // 任意の列設定がない場合はタグ構造から生成
  if (listtable.settings.colSettings == null || Array.isArray(listtable.settings.colSettings)) {
    listtable.settings.colSettings = [];

    for (var i = 0; i < colLen; i++) {
      listtable.settings.colSettings.push({
        id: 'col' + (i + 1),
        type: listtable.DEF_STATE.COL_TYPE
      });
    }
  }

  // データセット
  listtable.table.data = {};


  for (var i = 0; i < rowLen; i++) {
    var $row = listtable.table.$tr.eq(i);

    // dataオブジェクトと行要素を紐付けるidをセット
    var id = 'r' + (i + 1);
    listtable.table.data[id] = {};
    $row.data('listtable-id', id);

    // dataに各セルの情報セット
    var rowData = listtable.table.data[id];
    var $cellArr = $row.children('.list-table__cell');
    for (var j = 0; j < colLen; j++) {
      var $cell = $cellArr.eq(j);
      var colSetting = listtable.settings.colSettings[j];

      if (colSetting.id && colSetting.type) {
        if (colSetting.type == listtable.DEF_STATE.COL_TYPE) {
          // text型
          rowData[colSetting.id] = $cell.text();
        }
      }
    }
  }
}
