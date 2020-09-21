/**
 * このライブラリのベースとなる名前空間
 * @namespace
 */
var listtable = listtable || {};

/**
 * 定義用の名前空間
 * @const
 */
listtable.DEF_STATE = {}

/**
 * listtableのデフォルト設定
 * @const
 */
listtable.DEF_STATE.DEF_SETTINGS = {
  colSettings: null // 列定義 [{id: ..., type, ...}, ...]のJSON配列
}

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
