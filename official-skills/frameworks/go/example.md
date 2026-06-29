# Examples

## Example 1: HTTP Server in Go

```go
package main

import (
	"encoding/json"
	"log"
	"net/http"
)

type User struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

func handleUsers(w http.ResponseWriter, r *http.Request) {
	users := []User{{ID: 1, Name: "Alice"}}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(users)
}

func main() {
	http.HandleFunc("/api/users", handleUsers)
	log.Fatal(http.ListenAndServe(":8080", nil))
}
```

## Example 2: Concurrent Worker Pool

```go
package main

import "fmt"

func worker(id int, jobs <-chan int, results chan<- int) {
	for j := range jobs {
		results <- j * 2
	}
}

func main() {
	jobs := make(chan int, 5)
	results := make(chan int, 5)

	for w := 1; w <= 3; w++ {
		go worker(w, jobs, results)
	}

	for j := 1; j <= 5; j++ {
		jobs <- j
	}
	close(jobs)

	for r := 1; r <= 5; r++ {
		fmt.Println(<-results)
	}
}
```
