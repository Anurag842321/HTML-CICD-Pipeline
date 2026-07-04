pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "933538/cu-project"
        IMAGE_TAG = "${BUILD_NUMBER}"

        MASTER_SERVER = "master.tg.com"
        PROJECT_DIR = "/root/cci-cd-project-for-cu"

        DOCKERHUB_CREDENTIALS = "docker-hub"
    }

    stages {

        stage('Copy Project To Master Server') {
            steps {
                sh """
                ssh root@${MASTER_SERVER} "mkdir -p ${PROJECT_DIR}"
                scp -r ./* root@${MASTER_SERVER}:${PROJECT_DIR}/
                """
            }
        }

        stage('Build Docker Image') {
            steps {
                sh """
                ssh root@${MASTER_SERVER} '
                    cd ${PROJECT_DIR}
                    docker build -t ${DOCKER_IMAGE}:${IMAGE_TAG} .
                    docker tag ${DOCKER_IMAGE}:${IMAGE_TAG} ${DOCKER_IMAGE}:latest
                '
                """
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: "${DOCKERHUB_CREDENTIALS}",
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {
                    sh """
                    ssh root@${MASTER_SERVER} "
                        echo '${DOCKER_PASS}' | docker login -u '${DOCKER_USER}' --password-stdin

                        docker push ${DOCKER_IMAGE}:${IMAGE_TAG}
                        docker push ${DOCKER_IMAGE}:latest

                        docker logout
                    "
                    """
                }
            }
        }

        stage('Update Deployment Image') {
            steps {
                sh """
                ssh root@${MASTER_SERVER} "
                    sed -i 's|image:.*|image: ${DOCKER_IMAGE}:${IMAGE_TAG}|g' ${PROJECT_DIR}/deploy.yml
                "
                """
            }
        }

        stage('Deploy Application') {
            steps {
                sh """
                ssh root@${MASTER_SERVER} "
                    cd ${PROJECT_DIR}

                    kubectl apply -f deploy.yml
                    kubectl apply -f svc.yml

                    kubectl rollout status deployment/cu-deploy -n anu

                    kubectl get pods -n anu
                    kubectl get svc -n anu
                "
                """
            }
        }
    }

    post {
        success {
            echo "=================================="
            echo " CI/CD Pipeline Executed Successfully "
            echo "=================================="
        }

        failure {
            echo "=================================="
            echo " CI/CD Pipeline Failed "
            echo "=================================="
        }
    }
}
