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

