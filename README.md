## 使い方など

node.js version 6系を使用しています。nodebrewを使っていれば

```
$ nodebrew install-binary 6
$ nodebrew use 6
```

で使えます。

### step_1

サンプルを抽出する

```
node step_1 <MIN_ID> <MAX_ID> <SAMPLE_SIZE>
```

- `MIN_ID`, `MAX_ID` : サンプルを抽出する母集団の範囲
- `SAMPLE_SIZE` : 抽出するサンプル数

実行するとランダムに抽出されたコミュニティIDを`com_id`に持つコレクションが作成される。

### step_2

コミュニティページのHTMLを取得する。

```
node step_1 <COUNT> <INTERVAL>
```

- `COUNT` : `raw_html`が空、かつ、`status`が`0`のコレクションの`com_id`に対応したコミュニティページのHTMLを取得する。
- `INTERVAL` : 単位はmilli second。HTTP GETリクエストを発行する間隔

出力の書式は、

```
co${コミュニティID} -> ${HTTP STATUS} : ${取得済み件数}(成功数)/${スケジュールされた件数}
```

で、実際の出力は

```
co1234 -> 200 : 1(1)/100
co2345 -> 403 : 2(1)/100
co3456 -> 400 : 3(1)/100
```

という感じになる。

## 設定

### MongoDB

リモートのDBを使うばあいは別に開いた端末から、

```
ssh -N -L 27018:localhost:27017 hoge@hoge.com
```

でトンネルして、

```
// config.js
module.exports = {
  dbPath: `mongodb://127.0.0.1:27018/nico_1`
}
```

みたいにすればOK。

## TODO

スクレイプする項目

- 投稿動画数
- 説明文の単語数（形態素解析）
