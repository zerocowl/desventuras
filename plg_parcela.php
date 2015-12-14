<?php
/**
 * Plugin Name: WooCommerce Installments Example
 * Plugin URI: http://claudiosmweb.com/
 * Description: Added the price with 3 installments without interest.
 * Author: claudiosanches
 * Author URI: http://www.claudiosmweb.com/
 * Version: 1.0
 * License: GPLv2 or later
 */
/**
 * Calculates the price in 3 installments without interest.
 *
 * @return string Price in 3 installments.
 */
function cs_product_parceled() {
    $product = get_product();
    if ( $product->get_price_including_tax() ) {
        $value = woocommerce_price( $product->get_price_including_tax() / 3 );
        return $value;
    }
}
/**
 * Displays the Installments on product loop.
 *
 * @return string Price in 3 installments.
 */
function cs_product_parceled_loop() {
    echo '<br /><span style="color: #666; font-size: 100%" class="price">' . __( 'at&eacute; 3x de' ) . ' ' . cs_product_parceled() . '</span>';
}
/**
 * Displays the Installments on the product page.
 *
 * @return string Price in 3 installments.
 */
function cs_product_parceled_single() {
    $product = get_product();
?>
    <div itemprop="offers" itemscope itemtype="http://schema.org/Offer">

        <p style="margin: 0;" itemprop="price" class="price">
            <?php echo $product->get_price_html(); ?>
        </p>
        <p>
            <span style="color: #666; font-size: 100%" class="price"><?php  _e( 'ou at&eacute; 3x de' ) ?> <?php echo cs_product_parceled(); ?></span>
        </p>

        <meta itemprop="priceCurrency" content="<?php echo get_woocommerce_currency(); ?>" />
        <link itemprop="availability" href="http://schema.org/<?php echo $product->is_in_stock() ? 'InStock' : 'OutOfStock'; ?>" />
    </div>
<?php
}
add_action( 'woocommerce_after_shop_loop_item_title', 'cs_product_parceled_loop', 20 );
remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_price', 10 );
add_action( 'woocommerce_single_product_summary', 'cs_product_parceled_single', 10 );
