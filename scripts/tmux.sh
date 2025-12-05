#!/bin/sh
# https://tmuxai.dev/tmux-startup-script/

sessionName='astroVirgin'

# Start a new tmux session named "dev"
tmux new-session -d -s $sessionName

# Rename the first window
tmux rename-window -t $sessionName:0 "main"

# Create a new window for editors
# tmux new-window -t $sessionName:1 -n "editor"

# Split the editor window into panes
tmux split-window -v -t $sessionName:0
tmux split-window -h -t $sessionName:0.1

# Send commands to each pane
# tmux send-keys -t $sessionName:0.0 "zsh"
tmux send-keys -t $sessionName:0.1 "\
cd app && \
bun ci && \
bun dev \
" C-m

tmux send-keys -t $sessionName:0.2 "\
cd db && \
chmod 700 pocketbase && \
./pocketbase serve \
" C-m

# Select window 1 and attach to the session
tmux select-window -t $sessionName:0
tmux attach-session -t $sessionName