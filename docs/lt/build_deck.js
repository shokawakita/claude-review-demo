const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.3 x 7.5
pres.author = "Sho Kawakita";
pres.title = "レビューを出す前に、1回だけ通す";

const W = 13.3, H = 7.5, M = 0.7;

const INK = "16191D";
const PAPER = "FFFFFF";
const SOFT = "F2F4F6";
const MUTED = "6B7684";
const LINE = "D5DBE1";
const RED = "B3382C";
const RED_ON_DARK = "E8806F";
const SLATE = "2E4A63";
const DIM = "9AA5B1";

const JP = "Hiragino Sans";
const MONO = "Menlo";

let n = 0;

function base(dark) {
  n += 1;
  const s = pres.addSlide();
  s.background = { color: dark ? INK : PAPER };
  s.addText(String(n).padStart(2, "0") + " / 15", {
    x: W - 1.5, y: H - 0.55, w: 1.0, h: 0.3,
    align: "right", isTextBox: true, margin: 0,
    fontFace: MONO, fontSize: 10, color: dark ? "4A535C" : "AFB8C1",
  });
  return s;
}

function title(s, text, dark) {
  s.addText(text, {
    x: M, y: 0.55, w: W - M * 2, h: 0.85,
    isTextBox: true, margin: 0, valign: "top",
    fontFace: JP, fontSize: 30, bold: true,
    color: dark ? PAPER : INK,
  });
}

// 画像を貼るための破線枠
function frame(s, x, y, w, h, file, hint) {
  s.addShape(pres.ShapeType.roundRect, {
    x, y, w, h, rectRadius: 0.04,
    fill: { color: SOFT },
    line: { color: LINE, width: 1.25, dashType: "dash" },
  });
  s.addText(
    [
      { text: "画像を貼る", options: { fontFace: JP, fontSize: 11, color: MUTED, bold: true, breakLine: true } },
      { text: file, options: { fontFace: MONO, fontSize: 10, color: INK, breakLine: true } },
      { text: hint || "", options: { fontFace: JP, fontSize: 9.5, color: MUTED } },
    ],
    {
      x: x + 0.15, y, w: w - 0.3, h,
      isTextBox: true, margin: 0, align: "center", valign: "middle", lineSpacingMultiple: 1.25,
    }
  );
}

// 情報カード
function card(s, x, y, w, h, fillCol, lineCol) {
  s.addShape(pres.ShapeType.roundRect, {
    x, y, w, h, rectRadius: 0.03,
    fill: { color: fillCol },
    line: { color: lineCol, width: 1 },
  });
}

function cmdCard(s, x, y, w, cmd, sub, dark) {
  const h = sub ? 1.15 : 0.8;
  s.addShape(pres.ShapeType.roundRect, {
    x, y, w, h, rectRadius: 0.04,
    fill: { color: dark ? "22272D" : SOFT },
    line: { color: dark ? "39424B" : LINE, width: 1 },
  });
  s.addText(cmd, {
    x: x + 0.35, y: y + 0.14, w: w - 0.7, h: 0.5,
    isTextBox: true, margin: 0, valign: "middle",
    fontFace: MONO, fontSize: 24, bold: true, color: dark ? PAPER : INK,
  });
  if (sub) {
    s.addText(sub, {
      x: x + 0.35, y: y + 0.64, w: w - 0.7, h: 0.35,
      isTextBox: true, margin: 0, valign: "middle",
      fontFace: JP, fontSize: 13, color: dark ? DIM : MUTED,
    });
  }
}

/* ---------------------------------------------------------- 01 タイトル */
{
  const s = base(true);
  s.addText("レビューを出す前に、\n1回だけ通す", {
    x: M, y: 2.05, w: 9.4, h: 2.2,
    isTextBox: true, margin: 0, valign: "top",
    fontFace: JP, fontSize: 46, bold: true, color: PAPER, lineSpacingMultiple: 1.2,
  });
  s.addText("Claude Code  /code-review", {
    x: M, y: 4.5, w: 8, h: 0.45,
    isTextBox: true, margin: 0,
    fontFace: MONO, fontSize: 20, color: RED_ON_DARK,
  });
  s.addText("お名前 ／ 2026-XX-XX", {
    x: M, y: 5.15, w: 8, h: 0.35,
    isTextBox: true, margin: 0,
    fontFace: JP, fontSize: 14, color: DIM,
  });
  s.addNotes(
    "Claude Code の機能をひとつだけ紹介します。コードレビューです。\n" +
    "5分後には、今日から打てるコマンドを1つ持って帰れます。\n\n" +
    "【所要 10秒】"
  );
}

/* ---------------------------------------------------------- 02 つかみ */
{
  const s = base(false);
  s.addText("レビュー依頼、少し身構えませんか", {
    x: M, y: 1.35, w: W - M * 2, h: 0.9,
    isTextBox: true, margin: 0,
    fontFace: JP, fontSize: 38, bold: true, color: INK,
  });

  const items = [
    ["レビュー待ちで手が止まる", "自分の作業は進められない"],
    ["初歩的なミスを見せたくない", "指摘されて気づく恥ずかしさ"],
    ["相手の時間を取ってしまう", "レビュアーも忙しい"],
  ];
  const cw = 3.74, gap = 0.36;
  items.forEach((it, i) => {
    const x = M + i * (cw + gap);
    card(s, x, 2.95, cw, 1.75, SOFT, LINE);
    s.addText(it[0], {
      x: x + 0.3, y: 3.2, w: cw - 0.6, h: 0.75,
      isTextBox: true, margin: 0, valign: "top",
      fontFace: JP, fontSize: 17, bold: true, color: INK,
    });
    s.addText(it[1], {
      x: x + 0.3, y: 3.95, w: cw - 0.6, h: 0.55,
      isTextBox: true, margin: 0, valign: "top",
      fontFace: JP, fontSize: 13, color: MUTED,
    });
  });

  s.addText("これを、人に出す前に自分で一回潰せたらいい", {
    x: M, y: 5.15, w: W - M * 2, h: 0.5,
    isTextBox: true, margin: 0,
    fontFace: JP, fontSize: 18, color: RED, bold: true,
  });

  s.addNotes(
    "レビューを出すとき、少し身構えませんか。\n" +
    "初歩的なミスでレビュアーの時間を取るのが申し訳ない、とか。\n" +
    "あと単純に、レビュー待ちで手が止まるのがもったいない。\n" +
    "人に出す前に自分で一回潰せたらいいなと思って、試した話をします。\n\n" +
    "【所要 15秒】【縮めるなら1文に】"
  );
}

/* ---------------------------------------------------------- 03 結論 */
{
  const s = base(true);
  s.addText("結論", {
    x: M, y: 1.5, w: 6, h: 0.5,
    isTextBox: true, margin: 0,
    fontFace: JP, fontSize: 18, color: DIM,
  });
  s.addText("/code-review", {
    x: M, y: 2.35, w: 11, h: 1.4,
    isTextBox: true, margin: 0, valign: "middle",
    fontFace: MONO, fontSize: 60, bold: true, color: PAPER,
  });
  s.addText("引数なし。いまの差分を自動で拾う。", {
    x: M, y: 4.1, w: 11, h: 0.6,
    isTextBox: true, margin: 0,
    fontFace: JP, fontSize: 22, color: RED_ON_DARK,
  });
  s.addText("ファイル名も、対象の指定も要りません。", {
    x: M, y: 4.85, w: 11, h: 0.5,
    isTextBox: true, margin: 0,
    fontFace: JP, fontSize: 15, color: DIM,
  });
  s.addNotes(
    "結論はこれだけです。Claude Code を起動して /code-review。\n" +
    "引数もファイル名も要りません。いまのブランチの差分を自動で見つけてレビューします。\n\n" +
    "【所要 12秒】"
  );
}

/* ---------------------------------------------------------- 04 前提 */
{
  const s = base(false);
  title(s, "今日の前提", false);

  const rows = [
    ["モデル", "Claude Sonnet 5"],
    ["effort", "medium"],
    ["バージョン", "Claude Code v2.1.251"],
  ];
  rows.forEach((r, i) => {
    const y = 1.75 + i * 0.72;
    s.addText(r[0], {
      x: M, y, w: 1.6, h: 0.55,
      isTextBox: true, margin: 0, valign: "middle",
      fontFace: JP, fontSize: 13, color: MUTED,
    });
    s.addText(r[1], {
      x: M + 1.7, y, w: 3.6, h: 0.55,
      isTextBox: true, margin: 0, valign: "middle",
      fontFace: MONO, fontSize: 16, bold: true, color: INK,
    });
  });

  card(s, M, 4.05, 5.5, 1.95, SOFT, LINE);
  s.addText("想定している工程", {
    x: M + 0.3, y: 4.28, w: 4.9, h: 0.35,
    isTextBox: true, margin: 0,
    fontFace: JP, fontSize: 12, color: MUTED,
  });
  s.addText("製造／単体実装のレビュー", {
    x: M + 0.3, y: 4.65, w: 4.9, h: 0.45,
    isTextBox: true, margin: 0,
    fontFace: JP, fontSize: 20, bold: true, color: INK,
  });
  s.addText("結合試験まで行けば見つかるものを、その手前で潰す", {
    x: M + 0.3, y: 5.2, w: 4.9, h: 0.65,
    isTextBox: true, margin: 0, valign: "top",
    fontFace: JP, fontSize: 12.5, color: RED,
  });

  frame(s, 6.75, 1.75, 5.85, 4.25,
    "STEP5_1_:code-review実行前_medium.png",
    "上部の /model・/effort が見えるように");

  s.addNotes(
    "前提を先に言っておきます。モデルは Sonnet 5、effort は medium、\n" +
    "Claude Code は v2.1.251 です。画面の上に実際の設定が出ています。\n\n" +
    "それからどの工程の話か。今日お見せするのは製造・単体実装のフェーズ、\n" +
    "つまりコードを書き終えて人にレビューを出す直前です。\n" +
    "今日出てくるバグは、結合試験まで行けば見つかるはずのものです。\n" +
    "それをもっと手前で、自分ひとりで潰すという話をします。\n\n" +
    "【所要 20秒】【削らない — 質疑を封じる枚】"
  );
}

/* ---------------------------------------------------------- 05 題材 */
{
  const s = base(false);
  title(s, "題材：ごく普通のPR", false);

  s.addText("Go の収支集計CLI", {
    x: M, y: 1.8, w: 5.6, h: 0.55,
    isTextBox: true, margin: 0,
    fontFace: JP, fontSize: 26, bold: true, color: INK,
  });
  s.addText("CSVの台帳を読んで、月ごとの収支を出すだけ", {
    x: M, y: 2.4, w: 5.6, h: 0.4,
    isTextBox: true, margin: 0,
    fontFace: JP, fontSize: 13, color: MUTED,
  });

  const stats = [["3", "ファイル"], ["130", "行"]];
  stats.forEach((st, i) => {
    const x = M + i * 2.0;
    s.addText(st[0], {
      x, y: 3.05, w: 1.7, h: 0.85,
      isTextBox: true, margin: 0, valign: "middle",
      fontFace: MONO, fontSize: 44, bold: true, color: SLATE,
    });
    s.addText(st[1], {
      x, y: 3.9, w: 1.7, h: 0.3,
      isTextBox: true, margin: 0,
      fontFace: JP, fontSize: 12, color: MUTED,
    });
  });

  card(s, M, 4.55, 5.5, 1.35, SOFT, LINE);
  s.addText("build も vet も 無警告", {
    x: M + 0.3, y: 4.78, w: 4.9, h: 0.45,
    isTextBox: true, margin: 0,
    fontFace: JP, fontSize: 20, bold: true, color: INK,
  });
  s.addText("静的解析では、何も出ません", {
    x: M + 0.3, y: 5.3, w: 4.9, h: 0.4,
    isTextBox: true, margin: 0,
    fontFace: JP, fontSize: 13.5, color: RED,
  });

  frame(s, 6.75, 1.75, 5.85, 2.0, "STEP1_差分確認.png", "差分の大きさ");
  frame(s, 6.75, 3.95, 5.85, 2.0, "STEP2_ビルド&vet確認.png", "OK の行が読めれば十分");

  s.addNotes(
    "題材は Go の小さな CLI です。CSVの台帳を読んで、月ごとの収支を集計するだけ。\n" +
    "差分は3ファイル130行、よくあるサイズのPRだと思います。\n\n" +
    "build も vet も無警告で通ります。静的解析では何も出ません。\n\n" +
    "【所要 20秒】【この2枚で「どうせlintで出るやつ」を先に潰す】"
  );
}

/* ---------------------------------------------------------- 06 実装 */
{
  const s = base(false);
  title(s, "集計しているのは、これだけ", false);
  s.addText("売上なら売上に、それ以外は支出に足していく。最後に 売上 − 支出 で粗利を出す。", {
    x: M, y: 1.42, w: W - M * 2, h: 0.4,
    isTextBox: true, margin: 0,
    fontFace: JP, fontSize: 14, color: MUTED,
  });
  frame(s, 2.55, 1.95, 8.2, 4.75, "STEP3_実装確認.png",
    "上下の余白（プロンプト行）は切り落とす");

  s.addNotes(
    "1行ずつ見て、売上なら売上に、それ以外は支出に足していく。\n" +
    "最後に売上マイナス支出で粗利を出す。\n\n" +
    "ごく普通のコードに見えると思います。実際、私もそう思っていました。\n\n" +
    "【所要 18秒】【バグを探させない。次への伏線なのでさらっと流す】"
  );
}

/* ---------------------------------------------------------- 07 動かす（山場1） */
{
  const s = base(false);
  title(s, "動かす", false);
  s.addText("エラーなし。終了コード 0。", {
    x: M, y: 1.42, w: 5.6, h: 0.4,
    isTextBox: true, margin: 0,
    fontFace: JP, fontSize: 15, color: MUTED,
  });

  card(s, M, 2.05, 5.5, 1.85, "FBEDEB", RED);
  s.addText("表示された粗利", {
    x: M + 0.35, y: 2.25, w: 4.8, h: 0.3,
    isTextBox: true, margin: 0,
    fontFace: JP, fontSize: 12, color: RED,
  });
  s.addText("36,800 円", {
    x: M + 0.35, y: 2.6, w: 4.8, h: 1.1,
    isTextBox: true, margin: 0, valign: "middle",
    fontFace: MONO, fontSize: 46, bold: true, color: RED,
  });

  card(s, M, 4.1, 5.5, 1.5, SOFT, LINE);
  s.addText("実際に残るのは", {
    x: M + 0.35, y: 4.28, w: 4.8, h: 0.3,
    isTextBox: true, margin: 0,
    fontFace: JP, fontSize: 12, color: MUTED,
  });
  s.addText("3,200 円", {
    x: M + 0.35, y: 4.58, w: 4.8, h: 0.85,
    isTextBox: true, margin: 0, valign: "middle",
    fontFace: MONO, fontSize: 34, bold: true, color: INK,
  });

  s.addText("落ちないので、誰も気づかない。", {
    x: M, y: 5.8, w: 5.6, h: 0.45,
    isTextBox: true, margin: 0,
    fontFace: JP, fontSize: 17, bold: true, color: INK,
  });

  frame(s, 6.75, 1.75, 5.85, 4.25, "STEP4_go run確認.png",
    "「36800」の行に赤い枠線を追加する");

  s.addNotes(
    "動かします。エラーは出ません。終了コードも 0 です。\n\n" +
    "【ここで一拍おく】\n\n" +
    "でも間違っています。実際に手元に残るのは 3,200円。表示は 36,800円です。\n" +
    "支出をマイナスで持っているのに、さらに引き算していたので符号が反転していました。\n\n" +
    "こういうのが一番こわいと思っていて、落ちないので誰も気づかない。\n\n" +
    "【所要 33秒】【★絶対に削らない。赤枠を忘れずに】"
  );
}

/* ---------------------------------------------------------- 08 コマンドを打つ */
{
  const s = base(false);
  title(s, "コマンドを打つ", false);
  cmdCard(s, M, 1.9, 5.5, "/code-review", "引数なし", false);
  s.addText("別プロセスで走るので、\n待っている間も別の作業を頼めます。", {
    x: M, y: 3.4, w: 5.5, h: 1.0,
    isTextBox: true, margin: 0, valign: "top",
    fontFace: JP, fontSize: 16, color: INK, lineSpacingMultiple: 1.35,
  });
  s.addText("1〜2分で返ってきます", {
    x: M, y: 4.55, w: 5.5, h: 0.4,
    isTextBox: true, margin: 0,
    fontFace: JP, fontSize: 13, color: MUTED,
  });

  frame(s, 6.75, 1.75, 5.85, 4.25, "STEP5_2_:code-review実行中_medium.png",
    "main と code-review が並ぶ下部が見えるように");

  s.addNotes(
    "コマンドを打つと、裏で別プロセスとして走ります。\n" +
    "待っている間も別の作業を頼めます。\n\n" +
    "【所要 12秒】\n" +
    "【サブエージェントの仕組みには踏み込まない。5分では本題が薄まる】\n" +
    "【縮めるならこの枚を落とす — 03と内容が重なる】"
  );
}

/* ---------------------------------------------------------- 09 medium 3件 */
{
  const s = base(false);
  title(s, "medium の結果", false);

  s.addText([
    { text: "3", options: { fontFace: MONO, fontSize: 40, bold: true, color: SLATE } },
    { text: " 件", options: { fontFace: JP, fontSize: 18, color: MUTED } },
    { text: "     ", options: { fontFace: MONO, fontSize: 18 } },
    { text: "54", options: { fontFace: MONO, fontSize: 40, bold: true, color: SLATE } },
    { text: " 秒", options: { fontFace: JP, fontSize: 18, color: MUTED } },
  ], {
    x: M, y: 1.7, w: 5.4, h: 0.85,
    isTextBox: true, margin: 0, valign: "middle",
  });

  const finds = [
    "符号が二重反転して粗利が誤る",
    "ゼロ除算で panic する",
    "strconv.Atoi のエラー握りつぶし",
  ];
  finds.forEach((f, i) => {
    const y = 2.75 + i * 0.72;
    s.addShape(pres.ShapeType.ellipse, {
      x: M, y: y + 0.12, w: 0.16, h: 0.16, fill: { color: RED }, line: { color: RED, width: 0 },
    });
    s.addText(f, {
      x: M + 0.32, y, w: 5.1, h: 0.45,
      isTextBox: true, margin: 0, valign: "middle",
      fontFace: JP, fontSize: 15, color: INK,
    });
  });

  s.addText("3件とも、実際に動かして確認済み", {
    x: M, y: 5.05, w: 5.4, h: 0.4,
    isTextBox: true, margin: 0,
    fontFace: JP, fontSize: 13.5, color: RED,
  });

  frame(s, 6.75, 1.7, 5.85, 3.35, "STEP6_2_:code-review実行結果_メイン_medium.png", "主役。大きく");
  frame(s, 6.75, 5.25, 2.7, 1.1, "STEP6_1_..._サブエージェント_medium.png", "隅に小さく");

  s.addNotes(
    "54秒で3件出ました。さっきの符号バグは1件目です。\n" +
    "「2026-01のデータだと本来3200のところ36800と算出される」と、\n" +
    "具体的な数字まで書いてあります。推測ではなく、実際にビルドして動かした上での指摘です。\n\n" +
    "ここまでは、正直まあそうだろうなと思っていました。驚いたのはこの次です。\n\n" +
    "【所要 28秒】【メイン画面が結論、サブエージェント画面は作業量の証拠。説明不要】"
  );
}

/* ---------------------------------------------------------- 10 厳しさを上げる */
{
  const s = base(false);
  title(s, "厳しさを上げる", false);
  cmdCard(s, M, 2.0, 5.5, "/code-review high", "low ／ medium ／ high ／ max", false);
  s.addText("同じ差分に、今度は high で。", {
    x: M, y: 3.55, w: 5.5, h: 0.45,
    isTextBox: true, margin: 0,
    fontFace: JP, fontSize: 16, color: INK,
  });
  frame(s, 6.75, 1.9, 5.85, 3.6, "STEP7_1_:code-review実行前_high.png", "入力した行が読めればよい");

  s.addNotes(
    "どれくらい厳しく見るかを指定できます。同じ差分に、今度は high で。\n\n" +
    "【所要 8秒 — ここは速く抜ける】\n" +
    "【縮めるなら次の11に統合してよい】"
  );
}

/* ---------------------------------------------------------- 11 high 7件 */
{
  const s = base(false);
  title(s, "high の結果", false);

  const stats = [["7", "件", "3件 → 7件"], ["2:34", "", "54秒 → 約3倍"]];
  stats.forEach((st, i) => {
    const y = 1.7 + i * 1.5;
    s.addText([
      { text: st[0], options: { fontFace: MONO, fontSize: 40, bold: true, color: i === 0 ? SLATE : RED } },
      { text: st[1] ? " " + st[1] : "", options: { fontFace: JP, fontSize: 18, color: MUTED } },
    ], {
      x: M, y, w: 5.4, h: 0.8,
      isTextBox: true, margin: 0, valign: "middle",
    });
    s.addText(st[2], {
      x: M, y: y + 0.8, w: 5.4, h: 0.35,
      isTextBox: true, margin: 0,
      fontFace: JP, fontSize: 13, color: MUTED,
    });
  });

  card(s, M, 4.85, 5.5, 1.15, SOFT, LINE);
  s.addText("重要度が色分けされる（赤4件・黄3件）", {
    x: M + 0.3, y: 4.85, w: 4.9, h: 1.15,
    isTextBox: true, margin: 0, valign: "middle",
    fontFace: JP, fontSize: 14, color: INK,
  });

  frame(s, 6.75, 1.7, 5.85, 4.3, "STEP7_4_:code-review実行結果_メイン_high.png",
    "行番号の左の赤・黄の丸が見えるように");

  s.addNotes(
    "7件に増えました。時間は54秒から2分34秒。約3倍かかっています。\n\n" +
    "赤と黄で重要度が分かれていて、赤が4件、黄が3件。\n" +
    "増えたのは、表示順が実行のたびに変わる問題や、ループが2回まわっている効率の指摘などです。\n\n" +
    "ただ、私が一番おっと思ったのはこれでした。\n\n" +
    "【所要 20秒】【件数と、時間という代償を見せる枚。中身は読ませない】"
  );
}

/* ---------------------------------------------------------- 12 山場 */
{
  const s = base(false);
  title(s, "自分が書いたルールを読んでいる", false);
  s.addText("strconv.Atoi のエラー握りつぶし、についての指摘の末尾", {
    x: M, y: 1.42, w: W - M * 2, h: 0.35,
    isTextBox: true, margin: 0,
    fontFace: JP, fontSize: 13, color: MUTED,
  });

  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: 1.95, w: 5.5, h: 3.15, rectRadius: 0.04,
    fill: { color: INK }, line: { color: INK, width: 0 },
  });
  s.addText("これは CLAUDE.md のルール", {
    x: M + 0.4, y: 2.25, w: 4.7, h: 0.45,
    isTextBox: true, margin: 0,
    fontFace: JP, fontSize: 17, color: DIM,
  });
  s.addText("「エラーは握りつぶさず、\n意味のあるメッセージ付きで\n処理する」", {
    x: M + 0.4, y: 2.75, w: 4.7, h: 1.5,
    isTextBox: true, margin: 0, valign: "top",
    fontFace: JP, fontSize: 20, bold: true, color: PAPER, lineSpacingMultiple: 1.3,
  });
  s.addText("にも反する", {
    x: M + 0.4, y: 4.35, w: 4.7, h: 0.45,
    isTextBox: true, margin: 0,
    fontFace: JP, fontSize: 17, color: RED_ON_DARK,
  });

  s.addText("コードでもドキュメントでもなく、私の決めごと。", {
    x: M, y: 5.3, w: 5.5, h: 0.75,
    isTextBox: true, margin: 0, valign: "top",
    fontFace: JP, fontSize: 16, bold: true, color: RED, lineSpacingMultiple: 1.25,
  });

  frame(s, 6.75, 1.95, 5.85, 3.15, "STEP7_3_..._サブエージェント_high.png",
    "ledger.go:40 の指摘だけを切り出して大きく");
  frame(s, 6.75, 5.3, 2.7, 1.05, "STEP7_2_..._サブエージェント_high.png", "隅に小さく");

  s.addNotes(
    "3件目、エラーを握りつぶしているという指摘です。その最後にこう書いてありました。\n\n" +
    "【読み上げる】\n" +
    "「これは CLAUDE.md のルール、『エラーは握りつぶさず、意味のあるメッセージ付きで処理する』にも反する」\n\n" +
    "【ここで一拍おく】\n\n" +
    "CLAUDE.md は、私が普段から書いている自分のルールファイルです。\n" +
    "コードでもドキュメントでもなく、私の決めごとです。\n\n" +
    "Claude はそれを読んだ上で、「このコードはあなたのルールに反している」と言ってきました。\n" +
    "一般論のバグ検出ではなく、私の基準で見ている。\n\n" +
    "ちなみに1件目も同じです。分配を支出に混ぜている、という指摘。\n" +
    "これも私が決めた会計のルールと食い違っている箇所でした。\n\n" +
    "【所要 45秒】【★このLTの結論。絶対に削らない】\n" +
    "【投影して後ろから読めるか確認。読めなければ引用文をテキストで打ち直す】"
  );
}

/* ---------------------------------------------------------- 13 比較 */
{
  const s = base(false);
  title(s, "medium と high の違い", false);

  const th = { fill: SOFT, color: MUTED, fontFace: JP, fontSize: 12, bold: true, valign: "middle" };
  const td = { fontFace: JP, fontSize: 13.5, color: INK, valign: "middle" };
  const tdm = { fontFace: MONO, fontSize: 16, bold: true, color: INK, valign: "middle" };

  s.addTable(
    [
      [{ text: "", options: th }, { text: "medium（引数なし）", options: th }, { text: "high", options: th }],
      [{ text: "実行時間", options: { ...td, color: MUTED, fontSize: 12 } },
       { text: "54 秒", options: tdm },
       { text: "2 分 34 秒", options: { ...tdm, color: RED } }],
      [{ text: "指摘件数", options: { ...td, color: MUTED, fontSize: 12 } },
       { text: "3 件", options: tdm },
       { text: "7 件", options: { ...tdm, color: RED } }],
      [{ text: "探し方", options: { ...td, color: MUTED, fontSize: 12 } },
       { text: "差分が小さいと判断し、8方向のエージェント群は立てず手作業で検証", options: td },
       { text: "8つの観点でエージェントを展開し、重大なものは実際にビルド・実行して検証", options: td }],
      [{ text: "向く場面", options: { ...td, color: MUTED, fontSize: 12 } },
       { text: "日常のレビュー前チェック", options: td },
       { text: "リリース前、お金や権限を触る差分", options: td }],
    ],
    {
      x: M, y: 1.8, w: W - M * 2,
      colW: [1.7, 5.1, 5.1],
      rowH: [0.45, 0.6, 0.6, 1.15, 0.6],
      border: { type: "solid", color: LINE, pt: 1 },
      autoPage: false,
    }
  );

  s.addText("普段は引数なし。大きい差分だけ high。", {
    x: M, y: 5.55, w: W - M * 2, h: 0.5,
    isTextBox: true, margin: 0,
    fontFace: JP, fontSize: 18, bold: true, color: RED,
  });

  s.addNotes(
    "2つの違いです。54秒で3件に対して、2分34秒で7件。\n" +
    "件数は倍以上ですが、時間も約3倍かかります。\n\n" +
    "面白いのが探し方そのものが変わるところです。\n" +
    "medium のときは「差分が小さいので、8方向のエージェント群は立てずに手作業で確認した」と\n" +
    "書いてありました。high では「8つの観点でエージェントを展開して候補を出し、\n" +
    "重大なものは実際にビルドして動かして確かめた」と。\n\n" +
    "普段は引数なし。リリース前や、お金や権限を触る差分だけ high。\n" +
    "それくらいの使い分けでいいと思います。\n\n" +
    "【所要 25秒】"
  );
}

/* ---------------------------------------------------------- 14 使い方 */
{
  const s = base(false);
  title(s, "使い方", false);

  const rows = [
    ["/code-review", "引数なしでOK。まずはこれだけ"],
    ["/code-review high", "厳しさを上げる（low 〜 max）"],
    ["/code-review --fix", "指摘するだけでなく、その場で直す"],
    ["/code-review --comment", "GitHubのPRに行ごとのコメントを投稿"],
  ];
  rows.forEach((r, i) => {
    const y = 1.8 + i * 0.95;
    card(s, M, y, W - M * 2, 0.8, i === 0 ? "FBEDEB" : SOFT, i === 0 ? RED : LINE);
    s.addText(r[0], {
      x: M + 0.35, y, w: 4.6, h: 0.8,
      isTextBox: true, margin: 0, valign: "middle",
      fontFace: MONO, fontSize: 18, bold: true, color: i === 0 ? RED : INK,
    });
    s.addText(r[1], {
      x: M + 5.1, y, w: 6.4, h: 0.8,
      isTextBox: true, margin: 0, valign: "middle",
      fontFace: JP, fontSize: 14, color: MUTED,
    });
  });

  s.addText("毎回この精度が出るとは限りません。差分は自分でも見ます。", {
    x: M, y: 5.75, w: W - M * 2, h: 0.45,
    isTextBox: true, margin: 0,
    fontFace: JP, fontSize: 14, color: INK,
  });

  s.addNotes(
    "基本は引数なしでいいです。\n" +
    "--fix を付けると指摘するだけでなくその場で直します。\n" +
    "--comment を付けると GitHub のPRに行ごとのコメントとして投稿してくれます。\n\n" +
    "ひとつだけ。今回はうまく当たりましたが、毎回この精度が出るとは限りません。\n" +
    "差分は自分でも見ます。\n\n" +
    "【所要 18秒】【最後の一言は必ず言う。質疑がほぼ確実に来るため】"
  );
}

/* ---------------------------------------------------------- 15 まとめ */
{
  const s = base(true);
  s.addText("人に出す前に、1回だけ。", {
    x: M, y: 2.2, w: 11.5, h: 1.1,
    isTextBox: true, margin: 0, valign: "middle",
    fontFace: JP, fontSize: 40, bold: true, color: PAPER,
  });
  s.addText("/code-review", {
    x: M, y: 3.7, w: 11.5, h: 1.1,
    isTextBox: true, margin: 0, valign: "middle",
    fontFace: MONO, fontSize: 54, bold: true, color: RED_ON_DARK,
  });
  s.addText("ありがとうございました", {
    x: M, y: 5.3, w: 11.5, h: 0.45,
    isTextBox: true, margin: 0,
    fontFace: JP, fontSize: 15, color: DIM,
  });

  s.addNotes(
    "まとめます。人にレビューを出す前に1回だけ通してみてください。\n" +
    "恥ずかしい指摘を人に見せずに済みますし、レビュアーの負担も減ります。\n" +
    "打つコマンドは1つだけです。以上です、ありがとうございました。\n\n" +
    "【所要 12秒】【合計 4分56秒】"
  );
}

pres.writeFile({ fileName: process.argv[2] }).then((f) => console.log("written:", f));
