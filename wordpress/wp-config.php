<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/documentation/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wordpress' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'wy )r TOxjf@YDr(kVxw5F}EcSr]Evn~/8gZH}LlY$5){@~18@.#B!<w#]T*A xg' );
define( 'SECURE_AUTH_KEY',  'eGjCs(=XcD ~1K2XyP_IN5O(3_}O22KmNU4KlP&!/{[ >]!C{Z0Z^buPo)rj=,FZ' );
define( 'LOGGED_IN_KEY',    'tNY,?$s( 3j$#NxyX,90|rUIO]Lb_OQc:1bV0-}PF6QTsi6e5tEXYtF,CzX8O5``' );
define( 'NONCE_KEY',        '0(WYh*z.R[*E( ;@flU4+L.D%0JIJUc&_OWCGT<Ld9Dt3@OfV3UH4Vr &{l<gIJQ' );
define( 'AUTH_SALT',        '7Ua+=0.|I/^[qc*7}:qaG@ 4}8uG+=^K#AZ-;q^:;la)i&3*v*c<H(iDwH9<i,;*' );
define( 'SECURE_AUTH_SALT', 'bU h)^o`cRsz}]~iVffo9Fg ERPU>Ws=sa@|4e!}KKP_%~x=)bPuyt4cK(RSQq]=' );
define( 'LOGGED_IN_SALT',   'NWEu?3-X;t7cN);7Y`Gc_7L]=z1<s`XvG@$JuNDn*`=;gdL%E%2)4t<G%+xt.:W/' );
define( 'NONCE_SALT',       'cqlqzP49!E%WNohLk~NK*c*5z0Euv*?Ybl+z>H[Aj<t~.,28tqk;~cYGJ/E_nleD' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/documentation/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
