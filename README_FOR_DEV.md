# 開発ルール

## ブランチ使用ルール

#### 使用手順
1. masterブランチからdevelopブランチを作成
2. developブランチから実装する機能毎にfeatureブランチを作成
3. featureブランチで実装完了した機能はdevelopブランチにマージ
4. 統合テスト完了後にdevelop → masterマージ

#### ブランチの種類
- master:  
  最新バージョン管理用のブランチ
- develop (masterから派生):  
  開発作業の主軸となるブランチ
- feature (developから派生):  
  実装する機能毎のブランチ (feature/◯◯, feature/xxなど)

## フォルダ構成
```
root
├─src:ソース管理用フォルダ
├─dist:配布用フォルダ
├─test:開発の検証用フォルダ
├─demo:ライブラリ利用者向けサンプル
├─README.md:ライブラリ使用方法
└─README_FOR_DEV.md:開発ルール
```

## コミットメッセージ
 
#### 構成
 
 - Summary: 
```
<Prefix>: <Subject>
```
 - Description:  
```
<Body>

<Footer>
```

#### Prefix

何をしたのか特定の単語で記述

| 単語 | 内容 |
| ------------- | ------------- |
| 追加 |（機能・ファイルなどを）追加する|
| 修正 |（コードなどを）修正する、バグの修正等|
| 改善 |（コードなどを）改善する、パフォーマンスの改善やコードの整形等|
| 更新 |（パッケージやドキュメントなどを）更新する|
| 削除 |（ファイル名やコードを）除去する|
| 改名 |（ファイル名を）変更する|
| 移動 |（AをBに）移動する|
| 交換 |（AをBに）変更する|

#### Subject

何をしたのか文章で記述

- ◯◯に△△を追加する
- 文言を修正する
- ◯◯を最新版にアップデートする

#### Body

変更理由

#### Footer

補足情報