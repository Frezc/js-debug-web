import yaml from 'js-yaml';
import JSONEditor from 'jsoneditor';

var jsonEditor = new JSONEditor(document.getElementById('result'), {
  modes: ['tree', 'code']
});

document.getElementById('copyBtn').addEventListener('click', function () {
  copyToClipboard(JSON.stringify(jsonEditor.get(), null, 2))
})

document.getElementById('exec').addEventListener('click', function () {
  try {
    var inputEl = document.getElementById('input');
    var doc = yaml.load(inputEl.value);

    if (doc.TextureImporter.spriteSheet.sprites) {
      var sprites = doc.TextureImporter.spriteSheet.sprites;
      var frames = {};
      var sheetHeight = sprites[0].rect.y + sprites[0].rect.height;
      sprites.map(function (sprite) {
        frames[sprite.name] = {
          frame: {
            x: sprite.rect.x + sprite.border.x,
            y: sheetHeight - sprite.rect.y - sprite.rect.height + sprite.border.w,
            w: sprite.rect.width - sprite.border.x - sprite.border.z,
            h: sprite.rect.height - sprite.border.y - sprite.border.w
          },
          pivot: sprite.pivot
        }
      });
      jsonEditor.set({
        frames,
        meta: {
          image: document.getElementById('filename').value
        }
      });
    }
  } catch (e) {
    alert('not valid meta file');
    console.error(e);
  }
})

function copyToClipboard(text) {
  if (text.indexOf('-') !== -1) {
    let arr = text.split('-');
    text = arr[0] + arr[1];
  }
  var textArea = document.createElement("textarea");
  textArea.style.position = 'fixed';
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.width = '2em';
  textArea.style.height = '2em';
  textArea.style.padding = '0';
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';
  textArea.style.background = 'transparent';
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'copied to clipboard successfully' : 'fail';
    alert(msg);
  } catch (err) {
    alert('fail');
    console.error(err);
  }

  document.body.removeChild(textArea);
}