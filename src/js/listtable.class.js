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
  constructor(id, data) {
    this.id = id;
    this.data = data;
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
    if (rowKey == null) return this.data;
    if (rowKey == '') return this.data;
    if (typeof rowKey !== 'string') return this.data;
    // sortKeysのチェック
    if(sortKeys == null) return this.data;
    if(typeof sortKeys !== 'object') return this.data;
    // dataメンバのキーを取得
    var keys = Object.keys(this.data);
    var keysLength = keys.length;
    // dataメンバのキーからソート対象と対象外を分ける
    for (var i = 0; i < keysLength; i++){
      var key = keys[i];
      // ソート対象ならキー配列とソート配列に格納
      if (key.indexOf(rowKey) == 0) {
        keyArray.push( Number( key.replace(rowKey, '') ) );
        sortArray.push(this.data[key]);
      // ソート対象外なら対象外の配列に格納
      }else {
        otherKeyArray.push({key: key, value: this.data[key]});
      }
    }
    // ソート対象が1つもなければソートせず終了
    var keyArrayLength = keyArray.length;
    if (keyArrayLength == 0) return this.data;
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