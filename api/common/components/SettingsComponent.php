<?php
namespace common\components;

use Yii;
use yii\base\Component;
use common\models\Settings;

class SettingsComponent extends Component
{
    public function getGoogleAnalyticsKey() {
        return Settings::getSetting('google-analytics');
    }

    public function getGoogleTagManagerKey() {
        return Settings::getSetting('google-tag-manager');
    }

    public function getGoogleWebMasterTools() {
        return Settings::getSetting('google-webmaster-tools');
    }

    public function getGoogleAdSenseClient() {
        return Settings::getSetting('google_ad_client');
    }

    public function getGoogleAdSenseRsSlot() {
        return Settings::getSetting('google_ad_rs_slot');
    }

    public function getGoogleAdSenseRsSlotBottom() {
        return Settings::getSetting('google_ad_rs_slot_bottom');
    }

    public function getBingWebMasterTools() {
        return Settings::getSetting('bing-webmaster-tools');
    }

    public function getSiteName() {
        return Settings::getSetting('site-name');
    }

    public function getDividendBase() {
        return Settings::getSetting('dividend-base-url');
    }

    public function getDividendSuffix() {
        return Settings::getSetting('dividend-suffix');
    }

    public function getTitle() {
        return Settings::getSetting('title');
    }

    public function getBaseUrl() {
        return Settings::getSetting('site-url');
    }

    public function getVariant() {
        return Settings::getSetting('variant');
    }

    public function getSupportEmail() {
        return Settings::getSetting('support-email');
    }

    public function getInternationalSites() {
        return Settings::getSetting('international-sites');
    }

    public function getCopyright() {
        $site = self::getBaseUrl();
        $details = parse_url($site);
        if (!empty($details['host'])) {
            return $details['host'];
        }
        return 'LottoResults.com';
    }

    public function getCountry() {
        return Settings::getSetting('country');
    }

    public function getNationality() {
        return Settings::getSetting('nationality');
    }

    public function getResultsAPIkey() {
        return Settings::getSetting('results-api-key');
    }

    public function getResultsAPIsecret() {
        return Settings::getSetting('results-api-secret');
    }

    public function getHomeBannerAd(){
        return Settings::getSetting('home-banner-ad');
    }

    public function getHomeBannerAdLink(){
        return Settings::getSetting('home-banner-ad-link');
    }

    public function getHomeCharityAd(){
        return Settings::getSetting('home-charity-ad');
    }

    public function getHomeCharityAdLink(){
        return Settings::getSetting('home-charity-ad-link');
    }

    public function getHomeCharityAdTargetLocation(){
        return Settings::getSetting('home-charity-ad-target-location');
    }

    public function getArticleBannerAd(){
        return Settings::getSetting('article-banner-ad');
    }

    public function getBuyLottoLink(){
        return Settings::getSetting('buy-lotto-link');
    }

    public function getFacebook(){
        return Settings::getSetting('facebook');
    }

    public function getTwitter(){
        return Settings::getSetting('twitter');
    }

    public function getInstagram(){
        return Settings::getSetting('instagram');
    }

    public function getJumboSite(){
        return Settings::getSetting('jumbo-site');
    }
}

?>
