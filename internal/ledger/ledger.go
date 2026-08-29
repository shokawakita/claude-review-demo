// Package ledger は収支台帳の CSV を読み込む。
package ledger

import (
	"encoding/csv"
	"os"
	"strconv"
	"strings"
)

// Entry は台帳の1行を表す。
type Entry struct {
	Date    string
	EventID string
	Type    string
	Item    string
	Amount  int
}

// Load は path の台帳から、month で始まる日付の行だけを読み込む。
// month は "2026-01" の形式。
func Load(path string, month string) ([]Entry, error) {
	f, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	defer f.Close()

	records, err := csv.NewReader(f).ReadAll()
	if err != nil {
		return nil, err
	}

	var entries []Entry
	for _, rec := range records[1:] {
		if !strings.HasPrefix(rec[0], month) {
			continue
		}

		amount, _ := strconv.Atoi(rec[4])

		entries = append(entries, Entry{
			Date:    rec[0],
			EventID: rec[1],
			Type:    rec[2],
			Item:    rec[3],
			Amount:  amount,
		})
	}
	return entries, nil
}
