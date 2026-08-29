# 実際に返ってきたレビュー結果

2026-08-29 に `feature/monthly-summary` の差分（`main..HEAD`、3ファイル130行）に対して実行。
スライドには日本語の要約を貼ると伝わりやすいです。

| 実行 | 件数 |
|---|---|
| `/code-review`（medium） | **5件** |
| `/code-review high` | **8件** |

どちらも「実際にビルドして `testdata/ledger.csv` に対して動かし、
各指摘を再現した上で報告している」と明記されていました。

---

## medium で出た5件

1. **ゼロ除算で panic** — `internal/report/summary.go:49`
   `profit / len(events)`。該当データのない月（`kaihi 2026-05`）で
   `integer divide by zero`。

2. **支出の符号が反転** — `internal/report/summary.go:31`
   台帳は支出をマイナスで持つのに `expense += e.Amount` してから `income - expense`。
   二重に符号が反転している。`2026-01` は 支出 -16800 / 粗利 36800 と出るが、正しくは 16800 / 3200。

3. **`strconv.Atoi` のエラー握り潰し** — `internal/ledger/ledger.go:40`
   台帳にすでにある `"1,500"` が 0 として通る。`kaihi 2026-03` は売上 0円 と表示し、
   **売上が黙って消える。**

4. **空ファイルで panic** — `internal/ledger/ledger.go:35`
   `records[1:]` が `slice bounds out of range [1:0]`。
   main のエラーハンドリングを迂回して落ちる。

5. **出力順が非決定的** — `internal/report/summary.go:66`
   費目別内訳が map の反復。実行のたびに並び順が変わり、diff が取れず
   golden test が flaky になる。キーをソートすべき。

---

## high で追加された3件

6. **`share`（利益分配）を原価として集計している** — `internal/report/summary.go:31` ★山場

   > README states 利益分配 is paid out of gross profit, not 原価

   README の「集計のルール」に書いた決めごとへの違反。
   さらに、`else` で受けているので **`type` の打ち間違いや将来増える種別も
   全部だまって支出に入る** ことまで指摘された。

   **コードではなくリポジトリ内の文書を読んで、実装と突き合わせている。**
   LTで一番伝えたいのはここ。

7. **列数の検証がない** — `internal/ledger/ledger.go:36`
   `rec[0]`〜`rec[4]` の前に長さを見ていない。列の足りないヘッダで
   `index out of range [4] with length 3` の panic。

8. **月引数が未検証・前方一致** — `cmd/kaihi/main.go:19`
   `kaihi 2026-1` は10〜12月を集計し、`kaihi 2026` は1年分を合計する。
   **どちらも終了コード 0 で正常終了する。**

---

## 総括（そのまま引用できる一文）

> The first two together mean the headline profit number the tool exists to produce
> is wrong for every month; both are direct violations of the rules spelled out in
> README.md's 集計のルール section.

日本語にすると:

> 上位2件は、このツールが出すために存在している粗利という数字が
> 毎月間違っていることを意味する。どちらも README の「集計のルール」に
> 明記された決めごとへの直接の違反である。

---

## 注意

- **行番号は実行時点のものです。** 本番前に自分で流し直して、その画面を撮ってください
- 8件出たのはこのコードでの結果です。**毎回同じ件数・同じ精度が出るとは限りません。**
  質疑で聞かれたら正直にそう答えるのが安全です
