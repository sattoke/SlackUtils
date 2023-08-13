# SlackUtils

SlackUtils は [Slack](https://slack.com/) のためのユーティリティソフトウェアとなるChrome拡張機能である。
現在は主に下記の機能がある。

- 選択範囲をしたSlackのメッセージをSlackのMarkdown風記法[^1] [^2]としてクリップボードにコピーする機能。コピーの際に引用記号つきでコピーすることも可能
  - [目的] Slackの環境設定で「マークアップでメッセージを書式設定する」を「無効」（メッセージをリッチテキストで編集する最近のデフォルト設定）にしている場合、他のユーザのメッセージをコピーして、自身のメッセージ編集欄にペーストすると書式付きでペーストができる。しかし当該設定を「有効」（メッセージ編集時はSlackのMarkdown風記法で編集し、メッセージ送信後にリッチテキスト表示となる設定）にしている場合、書式なしのテキストとしてペーストされてしまう。 [^3] これは他のユーザのメッセージを引用する場合に不便なため、投稿されたメッセージのリッチテキストから元のメッセージをSlackのMarkdown風記法に変換してクリップボードにコピーを行えるようにしたものである。引用記号付きでコピーすることも可能である。

[^1]: 概ね [Formatting text for app surfaces | Slack](https://api.slack.com/reference/surfaces/formatting) に記載のSlack API向け記法である mrkdwn (!= Markdown) と同等に見えるが、リンクの記法やリストのマーカーが微妙に異なるため mrkdwn でもないようで、特別な呼称はつけられていないようだ。またよく知られたMarkdown (CommonMarkやGFMなど) の記法とも割と異なるので、ここでは「SlackのMarkdown風記法」と呼称する。
[^2]: [メッセージの書式設定を行う | Slack](https://slack.com/intl/ja-jp/help/articles/360039953113-%e3%83%a1%e3%83%83%e3%82%bb%e3%83%bc%e3%82%b8%e3%81%ae%e6%9b%b8%e5%bc%8f%e8%a8%ad%e5%ae%9a%e3%82%92%e8%a1%8c%e3%81%86) を参照。なお補足として、当該ページにはなぜか記載がないが、Slackの環境設定で「マークアップでメッセージを書式設定する」を「無効」（メッセージをリッチテキストで編集する最近のデフォルト設定）にした場合の利用方法を説明していると思われる [メッセージの書式設定 | Slack](https://slack.com/intl/ja-jp/help/articles/202288908-%e3%83%a1%e3%83%83%e3%82%bb%e3%83%bc%e3%82%b8%e3%81%ae%e6%9b%b8%e5%bc%8f%e8%a8%ad%e5%ae%9a?_gl=1*1qri8ym*_gcl_au*MTE1NDM0MDE0My4xNjg5NDk0MjQ0*_ga*NTIyNTAzNTAuMTY0NDkxMjMxMA..*_ga_QTJQME5M5D*MTY5MTk5NjY5Mi4yOS4wLjE2OTE5OTY2OTIuNjAuMC4w#u12510u12540u12463u12450u12483u12503) に記載のあるOrdered listやBulleted listも実際には使える。
[^3]: [メッセージの書式設定を行う | Slack](https://slack.com/intl/ja-jp/help/articles/360039953113-%e3%83%a1%e3%83%83%e3%82%bb%e3%83%bc%e3%82%b8%e3%81%ae%e6%9b%b8%e5%bc%8f%e8%a8%ad%e5%ae%9a%e3%82%92%e8%a1%8c%e3%81%86) にも「メッセージのコピーと貼り付けを行う時には、プレーンテキストとして表示されます。」と制限事項が記載されている。

# 拡張機能のインストール方法

chrome ウェブストアからインストールする方法と、GitHubにあるコードからインストールする方法の2種類がある。
後者は開発者向けの方法のため、通常はchrome ウェブストアからインストールすること(インストールが簡単)。

## chrome ウェブストアからインストール (一般利用者向け：通常はこちらを利用すること)

[TBD] [chrome ウェブストア](https://chrome.google.com/webstore/detail/xxxxxxxxxx) にアクセスし、「Chromeに追加」ボタンをクリックする。

## GitHubにあるコードからインストール (開発者向け)

1. https://github.com/sattoke/SlackUtils をgitでcloneするか、当該URLの「Code」ボタンをクリックすると出てくる「Download ZIP」でダウンロードし、ZIPを適当なところに展開する。
1. Chromeのアドレスバーに `chrome://extensions/` と入力するか、Chromeのメニュー（ケバブメニュー）から、「設定」→「拡張機能」と選択することで拡張機能の管理画面を開く
1. 「パッケージ化されていない拡張機能を読み込む」ボタンをクリックし、出てくるダイアログでローカルにcloneまたはダウンロードして展開したSlackUtilsのフォルダ(manifest.jsonが含まれるフォルダ)を指定する。
1. 正常にインストールされれば拡張機能の管理画面に「SlackUtils」が表示される。

# 初期設定

現段階では初期設定は不要である。

# 使用方法

- Slack上のメッセージをマウス等で範囲選択し、その選択部分を右クリックすると出てくる「SlackUtils」メニューのサブメニューから、「SlackのMarkdown風記法に変換してコピー」や「SlackのMarkdown風記法に変換してコピー(引用記号付き)」をクリックするとクリップボードにSlackのMarkdown風記法で選択したメッセージがコピーされる。

# リソース

- アイコンは下記の [icon rainbow](https://icon-rainbow.com/) の素材を使用。
  - [コメントの会話アイコン 5](https://icon-rainbow.com/%e3%82%b3%e3%83%a1%e3%83%b3%e3%83%88%e3%81%ae%e4%bc%9a%e8%a9%b1%e3%82%a2%e3%82%a4%e3%82%b3%e3%83%b3-5/)
