#!/bin/bash

SERVICES_DIR="."  # run inside services/

for SERVICE in "$SERVICES_DIR"/*; do
  if [ -d "$SERVICE" ]; then
    echo "⚡ Setting up $(basename "$SERVICE")..."
    cd "$SERVICE"

    # Run prisma deploy if defined
    if npm run | grep -q "prisma:deploy"; then
      echo "📦 Running prisma deploy..."
      npm run prisma:deploy
    else
      echo "ℹ️  No prisma:deploy script, skipping"
    fi

    # Start service
    echo "🚀 Starting service..."
    npm run tsc &

    cd - > /dev/null
  fi
done

echo "✅ All microservices setup finished"
