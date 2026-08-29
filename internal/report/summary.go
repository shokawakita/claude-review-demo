// Package report は台帳から月次の集計を組み立てる。
package report

import (
	"fmt"
	"io"

	"github.com/shokawakita/claude-review-demo/internal/ledger"
)

// Summary は1か月分の集計結果。
type Summary struct {
	Month    string
	Income   int
	Expense  int
	Profit   int
	PerEvent int
	ByItem   map[string]int
	EventNum int
}

// Build は台帳の行から集計を組み立てる。
func Build(month string, entries []ledger.Entry) Summary {
	income := 0
	expense := 0
	byItem := map[string]int{}

	for _, e := range entries {
		if e.Type == "income" {
			income += e.Amount
		} else {
			expense += e.Amount
		}
		byItem[e.Item] += e.Amount
	}

	profit := income - expense

	events := map[string]bool{}
	for _, e := range entries {
		events[e.EventID] = true
	}

	return Summary{
		Month:    month,
		Income:   income,
		Expense:  expense,
		Profit:   profit,
		PerEvent: profit / len(events),
		ByItem:   byItem,
		EventNum: len(events),
	}
}

// Print は集計結果を人が読める形で書き出す。
func (s Summary) Print(w io.Writer) {
	fmt.Fprintf(w, "=== %s の収支 ===\n", s.Month)
	fmt.Fprintf(w, "売上          : %8d 円\n", s.Income)
	fmt.Fprintf(w, "支出          : %8d 円\n", s.Expense)
	fmt.Fprintf(w, "粗利          : %8d 円\n", s.Profit)
	fmt.Fprintf(w, "イベント数    : %8d 件\n", s.EventNum)
	fmt.Fprintf(w, "1件あたり粗利 : %8d 円\n", s.PerEvent)

	fmt.Fprintln(w, "--- 費目別内訳 ---")
	for item, amount := range s.ByItem {
		fmt.Fprintf(w, "%-20s %8d 円\n", item, amount)
	}
}
