<?php
$col = $col ?? 'col-lg-4 col-xss-6';

if (empty($children)) {
    return;
}
?>
<div class="gfgbbs">
    <div class="container px-0">
        <div class="row">
        <?php foreach ($children as $child): ?>
            <?php
            $food = $child['food'];
            $image_src = null;
            if (isset($child['image_id']) && $child['image_id']) {
                $image_src = wp_get_attachment_image_src($child['image_id'], 'medium');
            }
            $link_href = get_permalink($food);
            ?>
            <div class="<?php echo esc_attr($col); ?> mb-3">
                <div class="card">
                    <?php if ($image_src): ?>
                        <?php if ($link_href): ?>
                            <a href="<?php echo esc_attr($link_href); ?>">
                        <?php endif; ?>
                            <img class="card-img-top" src="<?php echo esc_attr($image_src[0]); ?>" alt="<?php echo esc_html($food->post_title); ?>">
                        <?php if ($link_href): ?>
                            </a>
                        <?php endif; ?>
                    <?php endif; ?>
                    <div class="card-body">
                        <h3 class="card-title mb-0">
                            <?php if ($link_href): ?>
                                <a href="<?php echo esc_attr($link_href); ?>">
                            <?php endif; ?>
                                <?php echo esc_html($food->post_title); ?>
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