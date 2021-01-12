<?php

global $deli_version;
wp_enqueue_script('gfgb-quiz-script', get_stylesheet_directory_uri() . '/quiz.js', [], $deli_version, true);

?>
<script>
window.gfgbQuizz = <?php echo json_encode(json_decode($quiz_json)); ?>;
window.$ = jQuery;
</script>
<div class="gfgbbs">
    <div id="quizzContainer" class="mb-3" style="display:none"></div>
    <button class="mb-3" onclick="handleSearchButtonClick()"><?php echo esc_html(__('Haltbarkeit-Quiz starten')); ?></button>
</div>