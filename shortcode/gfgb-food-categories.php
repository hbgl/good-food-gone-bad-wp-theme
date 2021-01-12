<?php
$col = $col ?? 'col-lg-4 col-xss-6';

?>
<div class="gfgbbs">
    <div class="container px-0">
        <div class="row">
        <?php foreach ($entries as $entry): ?>
            <?php
            $term = $entry['term'];
            $image_src = null;
            if (isset($entry['image_id']) && $entry['image_id']) {
                $image_src = wp_get_attachment_image_src($entry['image_id'], 'medium');
            }
            $link_href = null;
            if ($entry['type'] === 'food_page') {
                if (isset($entry['food_post'])) {
                    $link_href = get_permalink($entry['food_post']);
                }
            } elseif ($entry['type'] === 'page') {
                if (isset($entry['page_id']) && $entry['page_id'] > 0) {
                    $link_href = get_permalink($entry['page_id']);
                }
            }
            ?>
            <div class="<?php echo esc_attr($col); ?> mb-3">
                <div class="card">
                    <?php if ($image_src): ?>
                        <?php if ($link_href): ?>
                            <a href="<?php echo esc_attr($link_href); ?>">
                        <?php endif; ?>
                            <img class="card-img-top" src="<?php echo esc_attr($image_src[0]); ?>" alt="<?php echo esc_html($term->name); ?>">
                        <?php if ($link_href): ?>
                            </a>
                        <?php endif; ?>
                    <?php endif; ?>
                    <div class="card-body">
                        <h3 class="card-title mb-0">
                            <?php if ($link_href): ?>
                                <a href="<?php echo esc_attr($link_href); ?>">
                            <?php endif; ?>
                                <?php echo esc_html($term->name); ?>
                            <?php if ($link_href): ?>
                                </a>
                            <?php endif; ?>
                        </h3>
                    </div>
                </div>
            </div>
        <?php endforeach; ?>
        </div>
    </div>
</div>