<?php
include_once 'dbconfig.php';

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
    $cover_url = 'https://covers.openlibrary.org/b/isbn/'.$isbn.'-L.jpg';
    
    // insert images into donor_name_isbn folder
    $targetDir = './media/bookDonations/'.$donor_name.'_'.$isbn;
    $targetDir = str_replace(' ', '_', $targetDir);
    
    // upload the front, back and random image into the directory
    $front_image = $_FILES['front_image']['name'];
    $back_image = $_FILES['back_image']['name'];
    $random_image = $_FILES['random_image']['name'];

    $front_image_tmp = $_FILES['front_image']['tmp_name'];
    $back_image_tmp = $_FILES['back_image']['tmp_name'];
    $random_image_tmp = $_FILES['random_image']['tmp_name'];

    $front_image_size = $_FILES['front_image']['size'];
    $back_image_size = $_FILES['back_image']['size'];
    $random_image_size = $_FILES['random_image']['size'];

    $front_image_type = $_FILES['front_image']['type'];
    $back_image_type = $_FILES['back_image']['type'];
    $random_image_type = $_FILES['random_image']['type'];

    $front_image_ext = strtolower(pathinfo($front_image, PATHINFO_EXTENSION));
    $back_image_ext = strtolower(pathinfo($back_image, PATHINFO_EXTENSION));
    $random_image_ext = strtolower(pathinfo($random_image, PATHINFO_EXTENSION));

    $front_image_name = 'front.'.$front_image_ext;
    $back_image_name = 'back.'.$back_image_ext;
    $random_image_name = 'random.'.$random_image_ext;

    $front_image_path = $targetDir.'/'.$front_image_name;
    $back_image_path = $targetDir.'/'.$back_image_name;
    $random_image_path = $targetDir.'/'.$random_image_name;

    // check if the directory already exists
    if(!is_dir($targetDir)) {
        mkdir($targetDir, 0777, true);
    }

    // move the images to the directory
    move_uploaded_file($front_image_tmp, $front_image_path);
    move_uploaded_file($back_image_tmp, $back_image_path);
    move_uploaded_file($random_image_tmp, $random_image_path);

    // insert into sql table book_donations
    $sql = "INSERT INTO book_donations (create_time, update_time, donor_name, donor_contact, donor_email, book_name, author, description, isbn, cover_url, front, back, random) VALUES (NOW(), NOW(), '$donor_name', '$donor_contact', '$donor_email', '$book_name', '$author_name', '$description', '$isbn', '$cover_url', '$front_image_path', '$back_image_path', '$random_image_path')";
    $result = $conn->query($sql);

    //show confirmation alert
    if($result) {
        echo "<script>alert('Book Donation Successful!');</scrip>";
        echo "<script>window.location.href='/book_donations.html';</script>";
    } else {
        echo "<script>alert('Book Donation Failed!');</script>";
        echo "<script>window.location.href='/donateBookForm.html';</script>";
    }
}
?>