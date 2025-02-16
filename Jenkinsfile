pipeline {
    agent any
    environment {
        NEXT_PUBLIC_API_URL = 'https://api.futurbyte.ae' // Change for staging
        NEXT_PUBLIC_FE_ORIGIN = 'https://futurbyte.co' // Change for staging
        NEXT_PUBLIC_API_TOKEN = credentials('NEXT_PUBLIC_API_TOKEN')
        NEXT_PUBLIC_LIVE_CHAT_LICENSE = credentials('NEXT_PUBLIC_LIVE_CHAT_LICENSE')
        NEXT_PUBLIC_GOOGLE_TGM_KEY = credentials('NEXT_PUBLIC_GOOGLE_TGM_KEY')
        NEXT_PUBLIC_HUBSPOT_PORTAL_ID = credentials('NEXT_PUBLIC_HUBSPOT_PORTAL_ID')
        NEXT_PUBLIC_HUBSPOT_KEY = credentials('NEXT_PUBLIC_HUBSPOT_KEY')
        AWS_REGION = 'me-central-1'
        AWS_S3_BUCKET_NAME = credentials('AWS_S3_BUCKET_NAME')
        EC2_USER = 'ubuntu'
        SSH_KEY = credentials('frontend_ssh_key')
        EC2_HOST = credentials('EC2_HOST')
        APP_NAME = 'fb-nextjs' // Change to 'fb-nextjs-stg' for staging
        GIT_CREDENTIALS = credentials('Github')
    }
    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', // Change to 'staging' for staging
                url: 'https://github.com/ahmedmota/ahmedmota-futurbyte-frontend-test.git',
                credentialsId: 'Github' // Use the credentials ID you set up in Jenkins
            }
        }
        stage('Build App') {
            steps {
                sh 'npm ci'
                sh 'npm run build'
            }
        }
        stage('Deploy to EC2') {
            steps {
                sshagent(['frontend_ssh_key']) {
                    sh '''
                    mkdir -p ~/.ssh/
                    echo "${SSH_KEY}" > ~/.ssh/id_rsa
                    chmod 600 ~/.ssh/id_rsa
                    scp -o StrictHostKeyChecking=no build.zip ${EC2_USER}@${EC2_HOST}:/home/${EC2_USER}/build.zip
                    ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} << EOF
                        rm -rf /home/${EC2_USER}/${APP_NAME} && \
                        unzip /home/${EC2_USER}/build.zip -d /home/${EC2_USER}/${APP_NAME} && \
                        export NVM_DIR=~/.nvm && source ~/.nvm/nvm.sh && \
                        cd /home/${EC2_USER}/${APP_NAME} && \
                        npm install --omit=dev && \
                        pm2 restart ${APP_NAME} && \
                        rm /home/${EC2_USER}/build.zip
                    EOF
                    '''
                }
            }
        }
    }
}
