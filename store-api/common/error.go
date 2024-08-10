package common

import (
	"encoding/json"
	"net/http"
	"time"
)

type CustomError struct {
	Message    string `json:"message"`
	StatusCode int    `json:"status_code"`
	// TODO: implement Error code
	// ErrorCode  string    `json:"error_code"`
	Timestamp time.Time `json:"timestamp"`
	Details   string    `json:"details,omitempty"`
}

// Error implements the error interface
func (e *CustomError) Error() string {
	return e.Message
}

// NewCustomError creates a new CustomError
func NewCustomError(message string, statusCode int, details string) *CustomError {
	return &CustomError{
		Message:    message,
		StatusCode: statusCode,
		// TODO: implement Error code
		// ErrorCode:  errorCode,
		Timestamp: time.Now(),
		Details:   details,
	}
}

// Send custom error as API response
func SendErrorResponse(w http.ResponseWriter, err *CustomError) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(err.StatusCode)
	json.NewEncoder(w).Encode(err)
}
