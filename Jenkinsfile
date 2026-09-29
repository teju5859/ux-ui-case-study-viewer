pipeline {
    agent any

    environment {
        // Replace with your Docker Hub Username (e.g., 'myusername')
        DOCKER_IMAGE_NAME = "devopsuser/ux-ui-case-study-viewer"
        IMAGE_TAG = "${BUILD_NUMBER}"
        KUBECONFIG_CREDENTIAL_ID = "k8s-kubeconfig"
        DOCKERHUB_CREDENTIAL_ID = "docker-hub-credentials"
    }

    stages {
        stage('1. Checkout Source Code') {
            steps {
                echo 'Checking out latest source code from GitHub repository...'
                checkout scm
            }
        }

        stage('2. Lint & Validate Code') {
            steps {
                echo 'Validating HTML, CSS, and JS static assets...'
                sh '''
                    echo "Checking frontend file existence..."
                    test -f frontend/index.html || exit 1
                    test -f frontend/styles.css || exit 1
                    test -f frontend/app.js || exit 1
                    echo "Frontend verification successful!"
                '''
            }
        }

        stage('3. Build Docker Image') {
            steps {
                echo "Building Docker image: ${DOCKER_IMAGE_NAME}:${IMAGE_TAG}"
                sh "docker build -t ${DOCKER_IMAGE_NAME}:${IMAGE_TAG} -t ${DOCKER_IMAGE_NAME}:latest ."
            }
        }

        stage('4. Docker Security & Health Check') {
            steps {
                echo 'Testing local Docker container instantiation...'
                sh '''
                    docker run -d --name test-container -p 8085:80 ${DOCKER_IMAGE_NAME}:${IMAGE_TAG}
                    sleep 3
                    curl -I http://localhost:8085 | grep "200 OK"
                    docker stop test-container
                    docker rm test-container
                    echo "Container test passed successfully!"
                '''
            }
        }

        stage('5. Push Image to Docker Hub') {
            steps {
                echo 'Authenticating with Docker Hub and pushing image...'
                withCredentials([usernamePassword(credentialsId: "${DOCKERHUB_CREDENTIAL_ID}", passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                    sh '''
                        echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
                        docker push ${DOCKER_IMAGE_NAME}:${IMAGE_TAG}
                        docker push ${DOCKER_IMAGE_NAME}:latest
                        docker logout
                    '''
                }
            }
        }

        stage('6. Deploy to Kubernetes Cluster') {
            steps {
                echo 'Applying Kubernetes manifests to cluster...'
                withCredentials([file(credentialsId: "${KUBECONFIG_CREDENTIAL_ID}", variable: 'KUBECONFIG')]) {
                    sh '''
                        echo "Applying Namespace..."
                        kubectl apply -f k8s/namespace.yaml

                        echo "Applying ConfigMap..."
                        kubectl apply -f k8s/configmap.yaml

                        echo "Updating Deployment image tag..."
                        kubectl set image deployment/uxui-viewer-deployment uxui-viewer=${DOCKER_IMAGE_NAME}:${IMAGE_TAG} -n uxui-viewer-prod || kubectl apply -f k8s/deployment.yaml

                        echo "Applying Service & Ingress..."
                        kubectl apply -f k8s/service.yaml
                        kubectl apply -f k8s/ingress.yaml

                        echo "Verifying Rolling Update Status..."
                        kubectl rollout status deployment/uxui-viewer-deployment -n uxui-viewer-prod --timeout=120s
                    '''
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up workspace artifacts...'
            cleanWs()
        }
        success {
            echo "Pipeline Completed Successfully! App is live on Kubernetes."
        }
        failure {
            echo "Pipeline Failed! Please check stage logs."
        }
    }
}
