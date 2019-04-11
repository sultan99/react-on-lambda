
# Atom configurations
> A hackable [text editor](https://atom.io/) for the 21st Century

<br/>

## Hot key setup for `λ`
1. Open init.coffe (File > Init Script...).
2. Copy & paste the snippet:

```
atom.commands.add 'atom-text-editor',
  'custom:lambda-insert': ->
    atom.workspace.getActiveTextEditor()?.insertText('λ')
```

3. Open keymap.cson (File -> Keymap...) and append:

```
'alt-l': 'custom:lambda-insert'
```

Now you can press alt + l to type `λ`
<br/>
<br/>

## CSS highlighting in template literal
1. Open settings (File > Settings...)
2. Click to `+Install`
3. Find package `language-babel` and install it.
4. In the settings of the package find `JavaScript Tagged Template Literal Grammar Extensions`
5. Paste this regexp: `"(?:λ\.(?:[a-z|1-5])+|(?:λ\(\w+\)))":source.css.styled` to the input.

<img src="https://raw.githubusercontent.com/sultan99/react-on-lambda/gh-pages/assets/atom-settings.png" style="border-radius: 4px;"/>
<br/>
