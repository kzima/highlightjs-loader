# highlightjs-loader 
Highlights content inside the <code> tags with the language specified in the class attribute. If no language is provided in the class, highlightjs-loader will attempt to auto detect.


## Usage

in your snippet.html
```html
<code class="html">
	<div>Example code</div>
</code>

<code class="js">
	<div>Example code</div>
</code>
```

in your app:
```javascript
var htmlSnippet = require('html!highlight./snippet.html');
```

## License

highlightjs-loader is available under MIT. See LICENSE for more details.
