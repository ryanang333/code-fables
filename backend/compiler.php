<?php
// Handle preflight (OPTIONS) request
ini_set('display_errors', 1);
error_reporting(E_ALL);
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
    header('Access-Control-Allow-Credentials: true');
    http_response_code(204);
    exit;
}

// Handle the actual POST request
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, OPTIONS');
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
    header('Access-Control-Allow-Credentials: true');
    $language = strtolower($_GET['language']);
    $qn = $_GET['qn'];
    $code = $_GET['code'];
    $name = $_GET['name'];
    $filePath = "temp/" . $name . $qn . ".txt";
    $programFile = fopen($filePath, "w");
    fwrite($programFile, $code);
    fclose($programFile);
    $command = "python3 $filePath 2>&1";
    $output = shell_exec($command);
    // Send a response with HTTP 200 status code
    $response = [
        'message' => 'Code running',
        'output' => $output
    ];
    unlink($programFile);
    header('Content-Type: application/json');
    http_response_code(200);
    echo json_encode($response);
} else {
    // Handle other HTTP methods if necessary
    http_response_code(405); // Method Not Allowed
    echo "Method not allowed";
}
