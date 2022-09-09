## REST Service

1) Clone repository

2) Go to "develop" branch

3) Install dependencies - npm install

4) Run project - npm run start

5) Open page on http://localhost:4000/doc


## Use docker
1) Clone repository
`git clone repo`

2) Switch to "docker" branch
`git checkout -b docker origin/docker`

3) Run docker command(--detach , -d : detached mode, run containers in the background)
`docker-compose up`
or
`docker-compose up -d`

4) Get access of the shell or CLI of the docker containers deployed
`docker exec -it nodejs2022q2-service_nodejs-service_1 sh`

5) Open page on http://localhost:4000/doc
