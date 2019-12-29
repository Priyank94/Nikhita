# - You should use the 'node' official image, with the alpine 6.x branch
FROM node:10.16.0 

LABEL name="Files Sell Frontend"

# - Create backend folder in container
RUN mkdir -p /frontend

# - Working directory
WORKDIR /frontend

# - Node uses a "package manager", so it needs to copy in package.json file     
COPY package.json /frontend 

# 'npm install' to install dependencies from package.json file
RUN npm cache clean --f && npm install --unsafe-perm 

# - Move local backend data to container
COPY . /frontend

# - Start node 
CMD ["npm run dev"]; 

# - Port expose so that it will access from local environment as well as from container
EXPOSE ${DEV_FRONTEND_PORT}

