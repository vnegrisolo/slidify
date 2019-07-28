# Slidify

This is a chrome plugin (extension) to convert split a markdown file into slides.

## Installation

1. Open [your chrome extension](chrome://extensions/)
2. Enable `Developer mode`
3. Click the buttom `Load unpacked`

## Usage

Open a `md` file, here's my example:

```shell
open -a "Google Chrome" README.md
```

### Shortkeys

- `Arrow right` => move to the next slide
- `Arrow left` => move to the previous slide
- `T` => change solarized themes between dark and light

Please move to the next slide using the right arrow.
---
<!-- Start by checking this slide comment, this might help -->
# Texts h1

## Texts h2

## Texts h3

Some paragraph very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very long.

---

# Code snippets

Here's some `inline code` example and also our code block snippet:

```elixir
defmodule FooBar do
  def bar(x) do
    y = x + 4
    IO.puts(y)
  end
end
```

---

# Here's some list:

regular list:

- item 1
- item 2

ordered list:

1. item 1
1. item 2

---

# Here's some table:

| Header One     | Header Two     |
| :------------- | :------------- |
| Item One       | Item Two       |
| Item One       | Item Two       |
| Item One       | Item Two       |
