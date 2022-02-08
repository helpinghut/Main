<?php
include_once 'dbConfig.php';

if(isset($_POST['submit'])) {
    // $targetDir = '/media/bookDonations';
    // $allowTypes = array('jpg','png','jpeg');

    $donor_name = $_POST['donor_name'];
    $donor_contact = $_POST['donor_contact'];
    $donor_email = $_POST['donor_email'];
    $book_name = $_POST['book_name'];
    $author_name = $_POST['author_name'];
    $description = $_POST['description'];
    $isbn = $_POST['isbn'];
    $image_url = "https://covers.openlibrary.org/b/isbn/".$isbn."-M.jpg";

    // verify if ISBN is correct
    $isbn_url = "https://openlibrary.org/api/books?bibkeys=ISBN:".$isbn."&format=json&jscmd=data";
    $isbn_json = file_get_contents($isbn_url);
    $isbn_data = json_decode($isbn_json, true);
    if(!isset($isbn_data['ISBN:'.$isbn]['title'])) {
        echo "<script>alert('ISBN is not valid');</script>";
        echo "<script>window.location.href='/donateBookForm.html';</script>";
    }

    // insert into sql table book_donations
    $sql = "INSERT INTO book_donations (create_time, update_time, donor_name, donor_contact, donor_email, book_name, author, description, isbn, image_url) VALUES (NOW(), NOW(), '$donor_name', '$donor_contact', '$donor_email', '$book_name', '$author_name', '$description', '$isbn', '$image_url')";
    $result = $conn->query($sql);

    //show confirmation alert
    if($result) {
        echo "<script>alert('Book Donation Successful!');</script>";
        echo "<script>window.location.href='/book_donations.html';</script>";
    } else {
        echo "<script>alert('Book Donation Failed!');</script>";
        echo "<script>window.location.href='/donateBookForm.html';</script>";
    }
}
?>