<!DOCTYPE html>
<html>
<head>
	<title>Afficheur Cesi</title>
	<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="themes/colored/style.css">
	<link rel="stylesheet" type="text/css" href="themes/colored/materialize/css/materialize.min.css">


	<script type="text/javascript" src="themes/colored/jquery-3.2.1.min.js"></script>
	<script type="text/javascript" src="themes/colored/javascript.js"></script>

</head>
<body profile="<?php echo $_PROFILE['name']; ?>">
<main>
	<nav class="brown darken-2">
    <div class="nav-wrapper">
    	<div class="row">
	      <img src="themes/colored/image/logo-groupeCesi.png" class="col s2" id="logo">
	      <div class="col s7 center"><h2>Bienvenue au Cesi <?php echo $_PROFILE['name']; ?></h2></div>
	      <div class="Zone4 col s2 right-align" style="margin-top: -0.5%;"><h1><span class="horloge" id="Time"></span></h1></div>
	      <!---->
      </div>
    </div>
  </nav>
