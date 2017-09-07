Link to PDF file (or attach file here): https://github.com/WeiFei365/pdfjs-node-cmap/blob/master/test.pdf

Configuration:
- Web browser and its version: Chrome 64bit 60.0.3112.113
- Operating system and its version: macOS 10.12.6
- PDF.js version: 1.8.619
- Is an extension: NO

Steps to reproduce the problem:
1. 请先下载我建立在 Github 上的实例代码：[https://github.com/WeiFei365/pdfjs-node-cmap](https://github.com/WeiFei365/pdfjs-node-cmap)

2. 在安装完依赖以后，在命令行依次执行下面两个命令：

```
node index.js
```

```
node index-mine.js
```

3. 上面两条命令会得到两个不同的文本，其中，我认为第二个才是对的；因为，我把 PDF 文件用 [pdf.js](https://github.com/mozilla/pdf.js) 在浏览器(Chrome) 打开时，他的输出文本就是这样；

4. 当我使用 [Visual Studio Code](https://code.visualstudio.com/) 来调试时，我发现在调试 [index.js](https://github.com/WeiFei365/pdfjs-node-cmap/blob/master/index.js) 这个文件时，会出有报错信息，请参见我的截图：，当我在 pdf.js 的 Issues 中查找解决方案时，我发现了这个：[#8064](https://github.com/mozilla/pdf.js/pull/8064), 但是，在我调试时，好像并没有正确的判断出是 Node.js 环境，并且 PDFJS.cMapUrl 的值是 *null*, 我不知道这会不会有问题?

5. [idnex-mine.js](https://github.com/WeiFei365/pdfjs-node-cmap/blob/master/index-mine.js) 这个文件中的代码 [L12](https://github.com/WeiFei365/pdfjs-node-cmap/blob/master/index-mine.js#L12) 是我模拟出来的一个 *XMLHttpRequest* Class, 因此，它可以转换出我想要的(对的)文本；但是，我觉得我这样来解决可能不太好?

What is the expected behavior? (add screenshot)

她应该输出以下文本：

```javascript
'268新華人壽保險股份有限公司  2015 年年度報告第十四節附件合併財務報表附註（續）截至2015年12月31日止年度（除特別標註外，金額單位為人民幣百萬元）38 資產負債表日後事項(1) 利潤分配根據2016年3月29日董事會通過的2015年度利潤分配方案，本公司擬向全體股東派發現金股利人民幣873百萬元，按已發行股份計算每股人民幣0.28元（含稅）。上述利潤分配方案尚待股東大會批准。(2) 籌建新華卓越養老保險股份有限公司2015年4月23日，保監會批復同意本公司和本公司附屬公司資產管理公司共同發起籌建新華卓越養老保險股份有限公司，註冊資本人民幣5億元，註冊地北京市，截至本財務報表批准報出日，籌建工作仍在進行中。(3) 發行資本補充債券本公司於2016年3月4日召開的2016年度第一次臨時股東大會審議批准的《關於公司2016年資本補充債券募集方案的議案（修訂）》，同意本公司2016年發行總額不超過人民幣50億元或不超過人民幣50億元等值美元的資本補充債券。本公司2016年資本補充債券發行事宜尚待監管部門批准。39 合併財務報表批准本合併財務報表於2016年3月29日經本公司董事會審議通過並批准報出。'
```

What went wrong? (add screenshot)

没有正确的判断出来我的环境是 Node.js 环境，因此调用了 *XMLHttpRequest* 来加载 'Adobe-CNS1-UCS2.bcmap' 文件，但是 *XMLHttpRequest* 是 DOM 中的对象;

Link to a viewer (if hosted on a site other than mozilla.github.io/pdf.js or as Firefox/Chrome extension):

请下载我上传的实例代码：[https://github.com/WeiFei365/pdfjs-node-cmap](https://github.com/WeiFei365/pdfjs-node-cmap)，并分别运行：index.js 和 index-mine.js 两个文件，查看命令行中的输出；或者，如果你也安装了最新版的 [Visual Studio Code](https://code.visualstudio.com/)，可以调试 index.js 文件，她会显示一些报错信息；

非常感谢！