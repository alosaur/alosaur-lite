export function getHtmlPage(content: string) {
  return `
<!doctype html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>Alosaur lite page</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/4.0.0/github-markdown.min.css">
  <style>
  body{
      box-sizing: border-box;
      min-width: 200px;
      max-width: 980px;
      margin: 0 auto;
      padding: 45px;
  }
  </style>
</head>
<body>
  <div class="markdown-body">
    ${content}
   </div>
</body>
</html>
`;
}
