require.config({ paths: { 'vs': 'monaco-editor/min/vs' }});
require(['vs/editor/editor.main'], function() {
  var editor = monaco.editor.create(document.getElementById('container'), {
    value: [
      'function x() {',
      '  console.log("Hello world!");',
      '}',
    ].join('\n'),
    language: 'javascript',
    theme: 'vs-dark'
  });
  
  window.editor = editor;
  // editor.getModel().updateOptions({ insertSpaces: true, tabSize: 4 })

  var button = document.getElementById('confirmBtn');
  button.removeAttribute('disabled');

  function exec() {
    try {
      eval('debugger;\n' + editor.getValue());
    } catch(e) {
      console.error(e);
      document.getElementById('errorDisplay').innerHTML = e.message;
    }
  }

  button.addEventListener('click', exec);
  document.addEventListener('keydown', function(e) {
    
    var keyCode = e.keyCode || e.which || e.charCode;
    var ctrlKey = e.ctrlKey || e.metaKey;
    if(ctrlKey && keyCode == 69) {
      console.log(e)
      e.preventDefault();
      exec();
    }
    return false;
  })
});
  
