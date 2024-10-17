<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "portfolio";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $rating = $_POST['rating'];
    $comments = $_POST['comments'];

    $stmt = $conn->prepare("INSERT INTO ratings (rating, comments) VALUES (?, ?)");
    $stmt->bind_param("is", $rating, $comments);

    if ($stmt->execute()) {
        echo "Thank you for your rating.";
    } else {
        echo "An error occurred. Please try again.";
    }

    $stmt->close();
} else {
    echo 'Invalid request method.';
}

$conn->close();
?>
