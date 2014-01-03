<?php
function microtime_string(){
    list($usec, $sec) = explode(" ", microtime());
    return ((string)$sec);
}
?>