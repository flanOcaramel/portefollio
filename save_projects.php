<?php
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    if ($data !== null) {
        $json = json_encode($data, JSON_PRETTY_PRINT);
        if (file_put_contents("projects.json", $json) !== false) {
            echo json_encode(["success" => true]);
        } else {
            http_response_code(500);
            echo json_encode([
                "success" => false,
                "error" => "Could not write file",
            ]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["success" => false, "error" => "Invalid JSON"]);
    }
} else {
    http_response_code(405);
    echo json_encode(["success" => false, "error" => "Method not allowed"]);
}
