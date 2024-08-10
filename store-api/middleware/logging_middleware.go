package middleware

import (
	"log"
	"net/http"
	"time"
)

// LoggingMiddleware logs information about incoming requests and outgoing responses
func LoggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()

		// Log incoming request
		log.Printf("Incoming request | Method: %s | URL: %s | RemoteAddr: %s",
			r.Method, r.URL.Path, r.RemoteAddr)

		// Create a custom ResponseWriter to capture the status code
		rw := &responseWriter{w, http.StatusOK}

		// Call the next handler
		next.ServeHTTP(rw, r)

		// Log outgoing response
		duration := time.Since(start)
		log.Printf("Outgoing response | Status: %d | Duration: %v",
			rw.status, duration)
	})
}

// Custom ResponseWriter to capture the status code
type responseWriter struct {
	http.ResponseWriter
	status int
}

func (rw *responseWriter) WriteHeader(code int) {
	rw.status = code
	rw.ResponseWriter.WriteHeader(code)
}
