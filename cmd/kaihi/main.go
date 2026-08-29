// Command kaihi は、サークルの会費と収支を月ごとに集計する。
package main

import (
	"fmt"
	"os"

	"github.com/shokawakita/claude-review-demo/internal/ledger"
	"github.com/shokawakita/claude-review-demo/internal/report"
)

const ledgerPath = "testdata/ledger.csv"

func main() {
	if len(os.Args) != 2 {
		fmt.Fprintln(os.Stderr, "usage: kaihi <YYYY-MM>")
		os.Exit(2)
	}
	month := os.Args[1]

	entries, err := ledger.Load(ledgerPath, month)
	if err != nil {
		fmt.Fprintf(os.Stderr, "台帳を読めませんでした: %v\n", err)
		os.Exit(1)
	}

	report.Build(month, entries).Print(os.Stdout)
}
