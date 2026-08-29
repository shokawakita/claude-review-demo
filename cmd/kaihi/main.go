// Command kaihi は、サークルの会費と収支を月ごとに集計する。
package main

import (
	"fmt"
	"os"
)

const ledgerPath = "testdata/ledger.csv"

func main() {
	if len(os.Args) != 2 {
		fmt.Fprintln(os.Stderr, "usage: kaihi <YYYY-MM>")
		os.Exit(2)
	}

	// TODO: 集計処理を実装する
	fmt.Printf("%s の集計は未実装です\n", os.Args[1])
}
