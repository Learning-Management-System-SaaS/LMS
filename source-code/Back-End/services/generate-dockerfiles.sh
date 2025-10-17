#!/bin/bash

# Define services and their ports
declare -A services
services=(
  ["tenant_and_organization_management"]=5001
  ["identity_and_access_management"]=5002
  ["communication_and_notification"]=5003
  ["learning_and_assessment_management"]=5004

)

# Loop through services and generate Dockerfile if missing
for service in "${!services[@]}"; do
  port=${services[$service]}
  service_dir="./$service"
  dockerfile="$service_dir/Dockerfile"

  if [ ! -d "$service_dir" ]; then
    echo "⚠️ Skipping $service (folder not found)"
    continue
  fi

  if [ -f "$dockerfile" ]; then
    echo "✅ $dockerfile already exists, skipping"
  else
    echo "📝 Creating $dockerfile with EXPOSE $port"
    cat > "$dockerfile" <<EOF
FROM node:18

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE $port
CMD ["npm", "run", "start"]
EOF
  fi
done
