# claude-review-demo

サークルの会費と収支を集計する CLI。

Claude Code の `/code-review` を紹介するライトニングトーク用のデモリポジトリです。

## 使い方

```
go run ./cmd/kaihi 2026-01
```

`testdata/ledger.csv` を読んで、指定した月の集計を出力します。

## 台帳の形式

| 列 | 内容 |
|---|---|
| `date` | `YYYY-MM-DD` |
| `event_id` | イベント識別子 |
| `type` | `income`（売上） / `expense`（原価） / `share`（利益分配） |
| `item` | 費目 |
| `amount` | 金額。**支出はマイナスで記録する** |

## 集計のルール

- **粗利 = 売上 − 原価**
- **利益分配（`share`）は原価ではなく、粗利の中から支払う**

この2つは会計上の決めごとです。実装するときは必ず守ってください。
