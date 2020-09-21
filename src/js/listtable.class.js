/**
 * このライブラリのベースとなる名前空間
 * @namespace
 */
var listtable = listtable || {};

/**
 * クラスに関する名前空間
 * @namespace
 */
listtable.class = {};

listtable.class.ListTable = function(id, settings) {
  this.id = id;
  var $table = $('#'+id);
  // 要素取得 + クラスセット
  this.$table = $table.addClass('list-table');
  this.$thead = $table.children('ul').eq(0).addClass('list-table__head');
  this.$tbody = $table.children('ul').eq(1).addClass('list-table__body');
  this.$th = this.$thead.children('li').addClass('list-table__list list-table__list--head');
  this.$tr = this.$tbody.children('li').addClass('list-table__list');
  this.$tdHead = this.$th.children('span').addClass('list-table__cell list-table__cell--head');
  this.$td = this.$tr.children('span').addClass('list-table__cell');

  var colLen = this.$tdHead.length; // 列数
  var rowLen = this.$tr.length; // 行数

  // 全般設定    settings = settings || {};
  this.settings = $.extend(listtable.DEF_STATE.DEF_SETTINGS, settings);
  // 任意の列設定がない場合はタグ構造から生成
  if (this.settings.colSettings == null || Array.isArray(this.settings.colSettings)) {
    this.settings.colSettings = [];
    for (var i = 0; i < colLen; i++) {
      this.settings.colSettings.push({
        id: 'col' + (i + 1),
        type: listtable.DEF_STATE.COL_TYPE
      });
    }
  }
  // データセット
  this.data = {};
  for (var i = 0; i < rowLen; i++) {
    var $row = this.$tr.eq(i);
    // dataオブジェクトと行要素を紐付けるidをセット
    var id = 'r' + (i + 1);
    this.data[id] = {};
    $row.attr('data-listtable-id', id);
    // dataに各セルの情報セット
    var rowData = this.data[id];
    var $cellArr = $row.children('.list-table__cell');
    for (var j = 0; j < colLen; j++) {
      var $cell = $cellArr.eq(j);
      var colSetting = this.settings.colSettings[j];
      if (colSetting.id && colSetting.type) {
        if (colSetting.type == listtable.DEF_STATE.COL_TYPE) {
          // text型
          rowData[colSetting.id] = $cell.text();
        }
      }
    }
  }
};
/**
  * JSONデータメンバをソートする。
  * sortKeysは次のように定義する<br/>
  * [{keyname: 'column1', order:listtable.sort.ORDER_ASC}, {keyname: 'column2', order:listtable.sort.ORDER_DESC}]
  * @param {String} rowKey - ソートを行うためのキーの接頭詞
  * @param {Array} sortKeys - ソートのキー、並び順のオブジェクト配列
  * @return {Object} ソートされたdataメンバを返す
  */
listtable.class.ListTable.prototype.sortData = function(sortKeys) {
  var sortArray = [];  // ソート用配列
  // dataメンバのキーを取得
  var keys = Object.keys(this.data);
  var keysLength = keys.length;
  // dataメンバのキーからソート対象と対象外を分ける
  for (var i = 0; i < keysLength; i++){
    var key = keys[i];
    // ソート配列に格納
    sortArray.push(this.data[key]);
  }
  // ソート配列をsortKeysでソート
  sortArray = listtable.class.ListTable.prototype.sortObject(sortArray, sortKeys);
  return sortArray;
};

/**
 * Object型の配列をソートする<br/>
 * sortKeysは次のように定義する<br/>
 * [{keyname: 'column1', order:listtable.sort.ORDER_ASC}, {keyname: 'column2', order:listtable.sort.ORDER_DESC}]
 * @param {Array} data - ソートを行うオブジェクト配列
 * @param {Array} sortKeys - ソートのキー、並び順のオブジェクト配列
 * @return {Array} ソートされたdataを返す
 */
listtable.class.ListTable.prototype.sortObject = function(data, sortKeys) {
  if (sortKeys === null) return data;
  if (typeof sortKeys !== 'object') return data;
  var sortdata = data.concat();
  sortdata.sort(function(a, b) {
    var keylen = sortKeys.length;
    for (var i = 0; i < keylen; i++) {
      var sortkey = sortKeys[i];
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
 * ソート配列の内容をテーブルに反映する
 * @param {Array} sortArray - 行idをソート順に並べた配列
 */
listtable.class.ListTable.prototype.sortTable = function(sortArray) {
  var len = sortArray.length;

  // ソートする順番にjquery要素を格納
  var $sortRows = null;
  for (var i = 0; i < len; i++) {
    var rowId = sortArray[i];
    var $row = this.$tr.filter('[data-listtable-id=' + rowId + ']');

    if ($sortRows == null) {
      $sortRows = $row;
    } else if($row.length) {
      $sortRows.add($row);
    }
  }

  this.$tbody.prepend($sortRows);
}