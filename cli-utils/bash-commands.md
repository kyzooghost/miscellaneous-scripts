Pass ls output to rm

```bash
ls *.log | xargs rm
```

Save output while seeing it

```bash
make build | tee build.log
```

Delete everything before the cursor

```bash
CRTL + W
```

Delete everything before the cursor

```bash
CRTL + U
```

What is using port 8080

```bash
lsof -i :8080
```

Check if ports 80 & 443 are open on remote server 

```bash
nc -zv google.com 80 443
```

Edit last command in vim

```bash
fc
```

Substitute string in last command

```bash
fc -s old=new
```

Search through command history

```bash
CRTL + R
```

Grep options

`-r` - recursive
`-i` - ignore case
`-n` - show lines

```bash
grep -rin <PATTERN> <DIRECTORY>
```

See then delete all "Chrome" processes

```bash
pgrep -a -f "Google Chrome"
pkill -f "Google Chrome"
```

Reload bash shell

```bash
zsh -l
```
