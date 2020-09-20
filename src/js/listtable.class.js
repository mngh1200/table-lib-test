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

listtable.class.ListTable = class {
  constructor(id, settings) {
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

    // 全般設定
    settings = settings || {};
    this.settings = $.extend(listtable.settings.DEF_SETTINGS, settings);

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
      $row.data('listtable-id', id);

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
    this.originData = this.data;
  }
  /**
   * JSONデータメンバをソートする。
   * sortKeysは次のように定義する<br/>
   * [{keyname: 'column1', order:listtable.sort.ORDER_ASC}, {keyname: 'column2', order:listtable.sort.ORDER_DESC}]
   * @param {String} rowKey - ソートを行うためのキーの接頭詞
   * @param {Array} sortKeys - ソートのキー、並び順のオブジェクト配列
   * @return {Object} ソートされたdataメンバを返す
   */
  sortData(rowKey, sortKeys){
    var sortArray = [];  // ソート用配列
    var keyArray = [];  // rowKeyと一致したキーの配列（rowKeyを削除して数値化したもの）
    var otherKeyArray = []; // rowKeyと一致しなかったキーと値を格納する配列
    // rowKeyチェック
    if (rowKey == null) return this.originData;
    if (rowKey == '') return this.originData;
    if (typeof rowKey !== 'string') return this.originData;
    // sortKeysのチェック
    if(sortKeys == null) return this.originData;
    if(typeof sortKeys !== 'object') return this.originData;
    // dataメンバのキーを取得
    var keys = Object.keys(this.originData);
    var keysLength = keys.length;
    // dataメンバのキーからソート対象と対象外を分ける
    for (var i = 0; i < keysLength; i++){
      var key = keys[i];
      // ソート対象ならキー配列とソート配列に格納
      if (key.indexOf(rowKey) == 0) {
        keyArray.push( Number( key.replace(rowKey, '') ) );
        sortArray.push(this.originData[key]);
      // ソート対象外なら対象外の配列に格納
      }else {
        otherKeyArray.push({key: key, value: this.originData[key]});
      }
    }
    // ソート対象が1つもなければソートせず終了
    var keyArrayLength = keyArray.length;
    if (keyArrayLength == 0) return this.originData;
    // キー配列を数値昇順に並び替え
    keyArray.sort(function(a,b){
      if( a < b ) return -1;
      if( a > b ) return 1;
      return 0;
    });
    // ソート配列をsortKeysでソート
    sortArray = listtable.sort.sortObject(sortArray, sortKeys);
    // ソートした配列を格納
    var newData = {};
    for (var i = 0; i < keyArrayLength; i++) {
      newData[rowKey+keyArray[i]] = sortArray[i];
    }
    // ソート対象外のデータを追加
    var otherKeyArrayLength = otherKeyArray.length;
    for (var i = 0; i < otherKeyArrayLength; i++) {
      var otherKey = otherKeyArray[i];
      newData[otherKey.key] = otherKey.value;
    }
    // データを上書き
    this.data = newData;
    // データを返す
    return this.data;
  }
}