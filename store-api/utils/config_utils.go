/*
	Singelton config to get environment variables from .env
	To add new env var, you need to do following steps
	- add env var in .env
	- define new field inside EnvConfig
	- implement get env inside loadEnv()
*/

package utils

import (
	"log"
	"os"
	"sync"

	"github.com/joho/godotenv"
)

// EnvConfig is a singleton struct that holds environment variables
type EnvConfig struct {
	JWTKey string
	// TODO: Add other environment variables here as needed
}

var (
	instance *EnvConfig
	once     sync.Once
)

// GetEnvConfig returns the singleton instance of EnvConfig
func GetEnvConfig() *EnvConfig {
	once.Do(func() {
		// Create a new instance of EnvConfig pointer
		instance = &EnvConfig{}
		// Load the environment variables into the instance
		instance.loadEnv()
	})
	return instance
}

// loadEnv loads environment variables from .env file and OS environment
func (c *EnvConfig) loadEnv() {
	err := godotenv.Load()
	if err != nil {
		log.Println("Warning: Error loading .env file")
	}

	c.JWTKey = getEnvOrPanic("JWT_SECRET_KEY")
	// TODO: Load other environment variables here
}

// getEnvOrPanic retrieves an environment variable or panics if it's not set
func getEnvOrPanic(key string) string {
	value := os.Getenv(key)
	if value == "" {
		log.Panicf("%s not set in environment", key)
	}
	return value
}
