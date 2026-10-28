import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'ar');
  CREATE TYPE "public"."enum_pages_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_hero_links_link_appearance" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'link');
  CREATE TYPE "public"."enum_pages_blocks_divisions_grid_variant" AS ENUM('cards', 'detailed', 'compact');
  CREATE TYPE "public"."enum_pages_blocks_divisions_grid_source" AS ENUM('all', 'selected');
  CREATE TYPE "public"."enum_pages_blocks_divisions_grid_cta_card_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_divisions_grid_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum_pages_blocks_process_steps_variant" AS ENUM('timeline', 'cards', 'columns', 'tiles');
  CREATE TYPE "public"."enum_pages_blocks_process_steps_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum_pages_blocks_feature_cards_cards_icon" AS ENUM('building', 'water', 'mbbr', 'it', 'hvac', 'materials', 'people', 'shield', 'target', 'eye', 'gear', 'bolt', 'network', 'cable', 'datacenter', 'lock', 'cctv', 'radio', 'cloud', 'headset', 'check', 'chart', 'globe', 'clipboard', 'tools', 'leaf', 'clock', 'document', 'truck', 'handshake', 'award', 'flame', 'pipe', 'valve', 'compressor', 'grating', 'safety', 'spare', 'briefcase', 'graduation', 'map', 'phone', 'mail', 'arrowRight', 'plus', 'search', 'download', 'upload', 'layers', 'star', 'linkedin', 'x', 'instagram', 'facebook', 'whatsapp', 'youtube');
  CREATE TYPE "public"."enum_pages_blocks_feature_cards_cards_tone" AS ENUM('light', 'navy', 'accent');
  CREATE TYPE "public"."enum_pages_blocks_feature_cards_cards_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_feature_cards_variant" AS ENUM('icon', 'numbered', 'statement', 'checklist');
  CREATE TYPE "public"."enum_pages_blocks_feature_cards_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_feature_cards_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum_pages_blocks_stats_variant" AS ENUM('bar', 'words');
  CREATE TYPE "public"."enum_pages_blocks_stats_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum_pages_blocks_logos_source" AS ENUM('client', 'partner', 'selected');
  CREATE TYPE "public"."enum_pages_blocks_logos_variant" AS ENUM('marquee', 'grid');
  CREATE TYPE "public"."enum_pages_blocks_logos_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum_pages_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_cta_links_link_appearance" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'link');
  CREATE TYPE "public"."enum_pages_blocks_cta_tone" AS ENUM('deep', 'accent');
  CREATE TYPE "public"."enum_pages_blocks_content_layout" AS ENUM('split', 'single', 'narrow');
  CREATE TYPE "public"."enum_pages_blocks_content_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum_pages_blocks_chips_variant" AS ENUM('pills', 'rows');
  CREATE TYPE "public"."enum_pages_blocks_chips_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum_pages_blocks_tabs_orientation" AS ENUM('horizontal', 'vertical');
  CREATE TYPE "public"."enum_pages_blocks_tabs_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum_pages_blocks_comparison_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum_pages_blocks_faq_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum_pages_blocks_downloads_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum_pages_blocks_team_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum_pages_blocks_media_block_size" AS ENUM('contained', 'full');
  CREATE TYPE "public"."enum_pages_blocks_image_text_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_image_text_links_link_appearance" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'link');
  CREATE TYPE "public"."enum_pages_blocks_image_text_image_position" AS ENUM('end', 'start');
  CREATE TYPE "public"."enum_pages_blocks_image_text_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum_pages_blocks_form_block_layout" AS ENUM('withContact', 'centered');
  CREATE TYPE "public"."enum_pages_blocks_projects_source" AS ENUM('all', 'featured', 'selected');
  CREATE TYPE "public"."enum_pages_blocks_projects_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum_pages_blocks_jobs_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum_pages_blocks_list_panel_variant" AS ENUM('stack', 'rows');
  CREATE TYPE "public"."enum_pages_blocks_list_panel_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum_pages_blocks_rfq_card_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_hero_type" AS ENUM('home', 'page', 'centered', 'none');
  CREATE TYPE "public"."enum_pages_hero_visual" AS ENUM('none', 'sideText', 'illustration', 'image', 'panel', 'tiles', 'wideImage');
  CREATE TYPE "public"."enum_pages_hero_pattern" AS ENUM('grid', 'dots');
  CREATE TYPE "public"."enum_pages_hero_illustration" AS ENUM('network', 'blueprint', 'membrane', 'reactor', 'valve', 'hvac', 'terminal');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_version_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_version_hero_links_link_appearance" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'link');
  CREATE TYPE "public"."enum__pages_v_blocks_divisions_grid_variant" AS ENUM('cards', 'detailed', 'compact');
  CREATE TYPE "public"."enum__pages_v_blocks_divisions_grid_source" AS ENUM('all', 'selected');
  CREATE TYPE "public"."enum__pages_v_blocks_divisions_grid_cta_card_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_divisions_grid_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum__pages_v_blocks_process_steps_variant" AS ENUM('timeline', 'cards', 'columns', 'tiles');
  CREATE TYPE "public"."enum__pages_v_blocks_process_steps_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_cards_cards_icon" AS ENUM('building', 'water', 'mbbr', 'it', 'hvac', 'materials', 'people', 'shield', 'target', 'eye', 'gear', 'bolt', 'network', 'cable', 'datacenter', 'lock', 'cctv', 'radio', 'cloud', 'headset', 'check', 'chart', 'globe', 'clipboard', 'tools', 'leaf', 'clock', 'document', 'truck', 'handshake', 'award', 'flame', 'pipe', 'valve', 'compressor', 'grating', 'safety', 'spare', 'briefcase', 'graduation', 'map', 'phone', 'mail', 'arrowRight', 'plus', 'search', 'download', 'upload', 'layers', 'star', 'linkedin', 'x', 'instagram', 'facebook', 'whatsapp', 'youtube');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_cards_cards_tone" AS ENUM('light', 'navy', 'accent');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_cards_cards_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_cards_variant" AS ENUM('icon', 'numbered', 'statement', 'checklist');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_cards_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_cards_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum__pages_v_blocks_stats_variant" AS ENUM('bar', 'words');
  CREATE TYPE "public"."enum__pages_v_blocks_stats_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum__pages_v_blocks_logos_source" AS ENUM('client', 'partner', 'selected');
  CREATE TYPE "public"."enum__pages_v_blocks_logos_variant" AS ENUM('marquee', 'grid');
  CREATE TYPE "public"."enum__pages_v_blocks_logos_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_links_link_appearance" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'link');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_tone" AS ENUM('deep', 'accent');
  CREATE TYPE "public"."enum__pages_v_blocks_content_layout" AS ENUM('split', 'single', 'narrow');
  CREATE TYPE "public"."enum__pages_v_blocks_content_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum__pages_v_blocks_chips_variant" AS ENUM('pills', 'rows');
  CREATE TYPE "public"."enum__pages_v_blocks_chips_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum__pages_v_blocks_tabs_orientation" AS ENUM('horizontal', 'vertical');
  CREATE TYPE "public"."enum__pages_v_blocks_tabs_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum__pages_v_blocks_comparison_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum__pages_v_blocks_downloads_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum__pages_v_blocks_team_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum__pages_v_blocks_media_block_size" AS ENUM('contained', 'full');
  CREATE TYPE "public"."enum__pages_v_blocks_image_text_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_image_text_links_link_appearance" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'link');
  CREATE TYPE "public"."enum__pages_v_blocks_image_text_image_position" AS ENUM('end', 'start');
  CREATE TYPE "public"."enum__pages_v_blocks_image_text_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum__pages_v_blocks_form_block_layout" AS ENUM('withContact', 'centered');
  CREATE TYPE "public"."enum__pages_v_blocks_projects_source" AS ENUM('all', 'featured', 'selected');
  CREATE TYPE "public"."enum__pages_v_blocks_projects_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum__pages_v_blocks_jobs_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum__pages_v_blocks_list_panel_variant" AS ENUM('stack', 'rows');
  CREATE TYPE "public"."enum__pages_v_blocks_list_panel_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum__pages_v_blocks_rfq_card_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_version_hero_type" AS ENUM('home', 'page', 'centered', 'none');
  CREATE TYPE "public"."enum__pages_v_version_hero_visual" AS ENUM('none', 'sideText', 'illustration', 'image', 'panel', 'tiles', 'wideImage');
  CREATE TYPE "public"."enum__pages_v_version_hero_pattern" AS ENUM('grid', 'dots');
  CREATE TYPE "public"."enum__pages_v_version_hero_illustration" AS ENUM('network', 'blueprint', 'membrane', 'reactor', 'valve', 'hvac', 'terminal');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_published_locale" AS ENUM('en', 'ar');
  CREATE TYPE "public"."enum_divisions_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_divisions_hero_links_link_appearance" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'link');
  CREATE TYPE "public"."enum_divisions_blocks_divisions_grid_variant" AS ENUM('cards', 'detailed', 'compact');
  CREATE TYPE "public"."enum_divisions_blocks_divisions_grid_source" AS ENUM('all', 'selected');
  CREATE TYPE "public"."enum_divisions_blocks_divisions_grid_cta_card_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_divisions_blocks_divisions_grid_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum_divisions_blocks_process_steps_variant" AS ENUM('timeline', 'cards', 'columns', 'tiles');
  CREATE TYPE "public"."enum_divisions_blocks_process_steps_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum_divisions_blocks_feature_cards_cards_icon" AS ENUM('building', 'water', 'mbbr', 'it', 'hvac', 'materials', 'people', 'shield', 'target', 'eye', 'gear', 'bolt', 'network', 'cable', 'datacenter', 'lock', 'cctv', 'radio', 'cloud', 'headset', 'check', 'chart', 'globe', 'clipboard', 'tools', 'leaf', 'clock', 'document', 'truck', 'handshake', 'award', 'flame', 'pipe', 'valve', 'compressor', 'grating', 'safety', 'spare', 'briefcase', 'graduation', 'map', 'phone', 'mail', 'arrowRight', 'plus', 'search', 'download', 'upload', 'layers', 'star', 'linkedin', 'x', 'instagram', 'facebook', 'whatsapp', 'youtube');
  CREATE TYPE "public"."enum_divisions_blocks_feature_cards_cards_tone" AS ENUM('light', 'navy', 'accent');
  CREATE TYPE "public"."enum_divisions_blocks_feature_cards_cards_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_divisions_blocks_feature_cards_variant" AS ENUM('icon', 'numbered', 'statement', 'checklist');
  CREATE TYPE "public"."enum_divisions_blocks_feature_cards_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_divisions_blocks_feature_cards_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum_divisions_blocks_stats_variant" AS ENUM('bar', 'words');
  CREATE TYPE "public"."enum_divisions_blocks_stats_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum_divisions_blocks_logos_source" AS ENUM('client', 'partner', 'selected');
  CREATE TYPE "public"."enum_divisions_blocks_logos_variant" AS ENUM('marquee', 'grid');
  CREATE TYPE "public"."enum_divisions_blocks_logos_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum_divisions_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_divisions_blocks_cta_links_link_appearance" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'link');
  CREATE TYPE "public"."enum_divisions_blocks_cta_tone" AS ENUM('deep', 'accent');
  CREATE TYPE "public"."enum_divisions_blocks_content_layout" AS ENUM('split', 'single', 'narrow');
  CREATE TYPE "public"."enum_divisions_blocks_content_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum_divisions_blocks_chips_variant" AS ENUM('pills', 'rows');
  CREATE TYPE "public"."enum_divisions_blocks_chips_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum_divisions_blocks_tabs_orientation" AS ENUM('horizontal', 'vertical');
  CREATE TYPE "public"."enum_divisions_blocks_tabs_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum_divisions_blocks_comparison_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum_divisions_blocks_faq_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum_divisions_blocks_downloads_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum_divisions_blocks_team_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum_divisions_blocks_media_block_size" AS ENUM('contained', 'full');
  CREATE TYPE "public"."enum_divisions_blocks_image_text_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_divisions_blocks_image_text_links_link_appearance" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'link');
  CREATE TYPE "public"."enum_divisions_blocks_image_text_image_position" AS ENUM('end', 'start');
  CREATE TYPE "public"."enum_divisions_blocks_image_text_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum_divisions_blocks_form_block_layout" AS ENUM('withContact', 'centered');
  CREATE TYPE "public"."enum_divisions_blocks_projects_source" AS ENUM('all', 'featured', 'selected');
  CREATE TYPE "public"."enum_divisions_blocks_projects_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum_divisions_blocks_jobs_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum_divisions_blocks_list_panel_variant" AS ENUM('stack', 'rows');
  CREATE TYPE "public"."enum_divisions_blocks_list_panel_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum_divisions_blocks_rfq_card_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_divisions_icon" AS ENUM('building', 'water', 'mbbr', 'it', 'hvac', 'materials', 'people', 'shield', 'target', 'eye', 'gear', 'bolt', 'network', 'cable', 'datacenter', 'lock', 'cctv', 'radio', 'cloud', 'headset', 'check', 'chart', 'globe', 'clipboard', 'tools', 'leaf', 'clock', 'document', 'truck', 'handshake', 'award', 'flame', 'pipe', 'valve', 'compressor', 'grating', 'safety', 'spare', 'briefcase', 'graduation', 'map', 'phone', 'mail', 'arrowRight', 'plus', 'search', 'download', 'upload', 'layers', 'star', 'linkedin', 'x', 'instagram', 'facebook', 'whatsapp', 'youtube');
  CREATE TYPE "public"."enum_divisions_hero_type" AS ENUM('home', 'page', 'centered', 'none');
  CREATE TYPE "public"."enum_divisions_hero_visual" AS ENUM('none', 'sideText', 'illustration', 'image', 'panel', 'tiles', 'wideImage');
  CREATE TYPE "public"."enum_divisions_hero_pattern" AS ENUM('grid', 'dots');
  CREATE TYPE "public"."enum_divisions_hero_illustration" AS ENUM('network', 'blueprint', 'membrane', 'reactor', 'valve', 'hvac', 'terminal');
  CREATE TYPE "public"."enum_divisions_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__divisions_v_version_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__divisions_v_version_hero_links_link_appearance" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'link');
  CREATE TYPE "public"."enum__divisions_v_blocks_divisions_grid_variant" AS ENUM('cards', 'detailed', 'compact');
  CREATE TYPE "public"."enum__divisions_v_blocks_divisions_grid_source" AS ENUM('all', 'selected');
  CREATE TYPE "public"."enum__divisions_v_blocks_divisions_grid_cta_card_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__divisions_v_blocks_divisions_grid_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum__divisions_v_blocks_process_steps_variant" AS ENUM('timeline', 'cards', 'columns', 'tiles');
  CREATE TYPE "public"."enum__divisions_v_blocks_process_steps_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum__divisions_v_blocks_feature_cards_cards_icon" AS ENUM('building', 'water', 'mbbr', 'it', 'hvac', 'materials', 'people', 'shield', 'target', 'eye', 'gear', 'bolt', 'network', 'cable', 'datacenter', 'lock', 'cctv', 'radio', 'cloud', 'headset', 'check', 'chart', 'globe', 'clipboard', 'tools', 'leaf', 'clock', 'document', 'truck', 'handshake', 'award', 'flame', 'pipe', 'valve', 'compressor', 'grating', 'safety', 'spare', 'briefcase', 'graduation', 'map', 'phone', 'mail', 'arrowRight', 'plus', 'search', 'download', 'upload', 'layers', 'star', 'linkedin', 'x', 'instagram', 'facebook', 'whatsapp', 'youtube');
  CREATE TYPE "public"."enum__divisions_v_blocks_feature_cards_cards_tone" AS ENUM('light', 'navy', 'accent');
  CREATE TYPE "public"."enum__divisions_v_blocks_feature_cards_cards_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__divisions_v_blocks_feature_cards_variant" AS ENUM('icon', 'numbered', 'statement', 'checklist');
  CREATE TYPE "public"."enum__divisions_v_blocks_feature_cards_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__divisions_v_blocks_feature_cards_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum__divisions_v_blocks_stats_variant" AS ENUM('bar', 'words');
  CREATE TYPE "public"."enum__divisions_v_blocks_stats_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum__divisions_v_blocks_logos_source" AS ENUM('client', 'partner', 'selected');
  CREATE TYPE "public"."enum__divisions_v_blocks_logos_variant" AS ENUM('marquee', 'grid');
  CREATE TYPE "public"."enum__divisions_v_blocks_logos_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum__divisions_v_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__divisions_v_blocks_cta_links_link_appearance" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'link');
  CREATE TYPE "public"."enum__divisions_v_blocks_cta_tone" AS ENUM('deep', 'accent');
  CREATE TYPE "public"."enum__divisions_v_blocks_content_layout" AS ENUM('split', 'single', 'narrow');
  CREATE TYPE "public"."enum__divisions_v_blocks_content_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum__divisions_v_blocks_chips_variant" AS ENUM('pills', 'rows');
  CREATE TYPE "public"."enum__divisions_v_blocks_chips_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum__divisions_v_blocks_tabs_orientation" AS ENUM('horizontal', 'vertical');
  CREATE TYPE "public"."enum__divisions_v_blocks_tabs_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum__divisions_v_blocks_comparison_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum__divisions_v_blocks_faq_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum__divisions_v_blocks_downloads_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum__divisions_v_blocks_team_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum__divisions_v_blocks_media_block_size" AS ENUM('contained', 'full');
  CREATE TYPE "public"."enum__divisions_v_blocks_image_text_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__divisions_v_blocks_image_text_links_link_appearance" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'link');
  CREATE TYPE "public"."enum__divisions_v_blocks_image_text_image_position" AS ENUM('end', 'start');
  CREATE TYPE "public"."enum__divisions_v_blocks_image_text_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum__divisions_v_blocks_form_block_layout" AS ENUM('withContact', 'centered');
  CREATE TYPE "public"."enum__divisions_v_blocks_projects_source" AS ENUM('all', 'featured', 'selected');
  CREATE TYPE "public"."enum__divisions_v_blocks_projects_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum__divisions_v_blocks_jobs_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum__divisions_v_blocks_list_panel_variant" AS ENUM('stack', 'rows');
  CREATE TYPE "public"."enum__divisions_v_blocks_list_panel_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum__divisions_v_blocks_rfq_card_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__divisions_v_version_icon" AS ENUM('building', 'water', 'mbbr', 'it', 'hvac', 'materials', 'people', 'shield', 'target', 'eye', 'gear', 'bolt', 'network', 'cable', 'datacenter', 'lock', 'cctv', 'radio', 'cloud', 'headset', 'check', 'chart', 'globe', 'clipboard', 'tools', 'leaf', 'clock', 'document', 'truck', 'handshake', 'award', 'flame', 'pipe', 'valve', 'compressor', 'grating', 'safety', 'spare', 'briefcase', 'graduation', 'map', 'phone', 'mail', 'arrowRight', 'plus', 'search', 'download', 'upload', 'layers', 'star', 'linkedin', 'x', 'instagram', 'facebook', 'whatsapp', 'youtube');
  CREATE TYPE "public"."enum__divisions_v_version_hero_type" AS ENUM('home', 'page', 'centered', 'none');
  CREATE TYPE "public"."enum__divisions_v_version_hero_visual" AS ENUM('none', 'sideText', 'illustration', 'image', 'panel', 'tiles', 'wideImage');
  CREATE TYPE "public"."enum__divisions_v_version_hero_pattern" AS ENUM('grid', 'dots');
  CREATE TYPE "public"."enum__divisions_v_version_hero_illustration" AS ENUM('network', 'blueprint', 'membrane', 'reactor', 'valve', 'hvac', 'terminal');
  CREATE TYPE "public"."enum__divisions_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__divisions_v_published_locale" AS ENUM('en', 'ar');
  CREATE TYPE "public"."enum_projects_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__projects_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__projects_v_published_locale" AS ENUM('en', 'ar');
  CREATE TYPE "public"."enum_news_category" AS ENUM('news', 'project', 'insight', 'hse');
  CREATE TYPE "public"."enum_news_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__news_v_version_category" AS ENUM('news', 'project', 'insight', 'hse');
  CREATE TYPE "public"."enum__news_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__news_v_published_locale" AS ENUM('en', 'ar');
  CREATE TYPE "public"."enum_partners_type" AS ENUM('client', 'partner');
  CREATE TYPE "public"."enum_documents_category" AS ENUM('policy', 'certificate', 'profile', 'brochure', 'other');
  CREATE TYPE "public"."enum_reusable_blocks_blocks_divisions_grid_variant" AS ENUM('cards', 'detailed', 'compact');
  CREATE TYPE "public"."enum_reusable_blocks_blocks_divisions_grid_source" AS ENUM('all', 'selected');
  CREATE TYPE "public"."enum_reusable_blocks_blocks_divisions_grid_cta_card_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_reusable_blocks_blocks_divisions_grid_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum_reusable_blocks_blocks_process_steps_variant" AS ENUM('timeline', 'cards', 'columns', 'tiles');
  CREATE TYPE "public"."enum_reusable_blocks_blocks_process_steps_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum_reusable_blocks_blocks_feature_cards_cards_icon" AS ENUM('building', 'water', 'mbbr', 'it', 'hvac', 'materials', 'people', 'shield', 'target', 'eye', 'gear', 'bolt', 'network', 'cable', 'datacenter', 'lock', 'cctv', 'radio', 'cloud', 'headset', 'check', 'chart', 'globe', 'clipboard', 'tools', 'leaf', 'clock', 'document', 'truck', 'handshake', 'award', 'flame', 'pipe', 'valve', 'compressor', 'grating', 'safety', 'spare', 'briefcase', 'graduation', 'map', 'phone', 'mail', 'arrowRight', 'plus', 'search', 'download', 'upload', 'layers', 'star', 'linkedin', 'x', 'instagram', 'facebook', 'whatsapp', 'youtube');
  CREATE TYPE "public"."enum_reusable_blocks_blocks_feature_cards_cards_tone" AS ENUM('light', 'navy', 'accent');
  CREATE TYPE "public"."enum_reusable_blocks_blocks_feature_cards_cards_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_reusable_blocks_blocks_feature_cards_variant" AS ENUM('icon', 'numbered', 'statement', 'checklist');
  CREATE TYPE "public"."enum_reusable_blocks_blocks_feature_cards_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_reusable_blocks_blocks_feature_cards_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum_reusable_blocks_blocks_stats_variant" AS ENUM('bar', 'words');
  CREATE TYPE "public"."enum_reusable_blocks_blocks_stats_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum_reusable_blocks_blocks_logos_source" AS ENUM('client', 'partner', 'selected');
  CREATE TYPE "public"."enum_reusable_blocks_blocks_logos_variant" AS ENUM('marquee', 'grid');
  CREATE TYPE "public"."enum_reusable_blocks_blocks_logos_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum_reusable_blocks_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_reusable_blocks_blocks_cta_links_link_appearance" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'link');
  CREATE TYPE "public"."enum_reusable_blocks_blocks_cta_tone" AS ENUM('deep', 'accent');
  CREATE TYPE "public"."enum_reusable_blocks_blocks_content_layout" AS ENUM('split', 'single', 'narrow');
  CREATE TYPE "public"."enum_reusable_blocks_blocks_content_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum_reusable_blocks_blocks_chips_variant" AS ENUM('pills', 'rows');
  CREATE TYPE "public"."enum_reusable_blocks_blocks_chips_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum_reusable_blocks_blocks_tabs_orientation" AS ENUM('horizontal', 'vertical');
  CREATE TYPE "public"."enum_reusable_blocks_blocks_tabs_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum_reusable_blocks_blocks_comparison_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum_reusable_blocks_blocks_faq_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum_reusable_blocks_blocks_downloads_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum_reusable_blocks_blocks_team_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum_reusable_blocks_blocks_media_block_size" AS ENUM('contained', 'full');
  CREATE TYPE "public"."enum_reusable_blocks_blocks_image_text_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_reusable_blocks_blocks_image_text_links_link_appearance" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'link');
  CREATE TYPE "public"."enum_reusable_blocks_blocks_image_text_image_position" AS ENUM('end', 'start');
  CREATE TYPE "public"."enum_reusable_blocks_blocks_image_text_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum_reusable_blocks_blocks_form_block_layout" AS ENUM('withContact', 'centered');
  CREATE TYPE "public"."enum_reusable_blocks_blocks_projects_source" AS ENUM('all', 'featured', 'selected');
  CREATE TYPE "public"."enum_reusable_blocks_blocks_projects_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum_reusable_blocks_blocks_jobs_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum_reusable_blocks_blocks_list_panel_variant" AS ENUM('stack', 'rows');
  CREATE TYPE "public"."enum_reusable_blocks_blocks_list_panel_background" AS ENUM('paper', 'white', 'navy', 'deep');
  CREATE TYPE "public"."enum_reusable_blocks_blocks_rfq_card_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_job_openings_skills_weight" AS ENUM('1', '2', '3', '4', '5');
  CREATE TYPE "public"."enum_job_openings_screening_questions_type" AS ENUM('yesno', 'number', 'select', 'text');
  CREATE TYPE "public"."enum_job_openings_screening_questions_weight" AS ENUM('1', '2', '3', '4', '5');
  CREATE TYPE "public"."enum_job_openings_employment_type" AS ENUM('full-time', 'contract', 'part-time', 'temporary', 'internship');
  CREATE TYPE "public"."enum_job_openings_workplace" AS ENUM('onsite', 'site', 'hybrid', 'remote');
  CREATE TYPE "public"."enum_job_openings_education_level" AS ENUM('none', 'highschool', 'diploma', 'bachelor', 'master', 'phd');
  CREATE TYPE "public"."enum_job_openings_status" AS ENUM('draft', 'open', 'paused', 'closed', 'filled');
  CREATE TYPE "public"."enum_applications_tags" AS ENUM('top', 'future', 'saudi', 'available', 'referral', 'transfer');
  CREATE TYPE "public"."enum_applications_education_level" AS ENUM('none', 'highschool', 'diploma', 'bachelor', 'master', 'phd');
  CREATE TYPE "public"."enum_applications_notice_period" AS ENUM('immediate', '2w', '1m', '2m', '3m');
  CREATE TYPE "public"."enum_applications_stage" AS ENUM('new', 'reviewing', 'shortlisted', 'interview', 'offer', 'hired', 'rejected', 'withdrawn');
  CREATE TYPE "public"."enum_applications_rejection_reason" AS ENUM('experience', 'skills', 'screening', 'filled', 'other');
  CREATE TYPE "public"."enum_applications_match_band" AS ENUM('strong', 'good', 'fair', 'low', 'knockout', 'pending');
  CREATE TYPE "public"."enum_applications_rating" AS ENUM('1', '2', '3', '4', '5');
  CREATE TYPE "public"."enum_vendors_regions" AS ENUM('eastern', 'central', 'western', 'northern', 'southern', 'gcc', 'international');
  CREATE TYPE "public"."enum_vendors_certifications" AS ENUM('iso9001', 'iso14001', 'iso45001', 'iso27001', 'aramco', 'sabic', 'sec', 'other');
  CREATE TYPE "public"."enum_vendors_documents_review_status" AS ENUM('pending', 'accepted', 'rejected', 'expired');
  CREATE TYPE "public"."enum_vendors_status_history_status" AS ENUM('draft', 'submitted', 'document_review', 'clarification', 'technical_review', 'compliance_review', 'approved', 'rejected', 'suspended');
  CREATE TYPE "public"."enum_vendors_vendor_type" AS ENUM('manufacturer', 'distributor', 'subcontractor', 'service', 'consultant');
  CREATE TYPE "public"."enum_vendors_employees" AS ENUM('1–10', '11–50', '51–200', '201–1000', '1000+');
  CREATE TYPE "public"."enum_vendors_nitaqat" AS ENUM('platinum', 'high-green', 'mid-green', 'low-green', 'yellow', 'red', 'na');
  CREATE TYPE "public"."enum_vendors_turnover_band" AS ENUM('< 1M', '1M – 5M', '5M – 20M', '20M – 100M', '100M +');
  CREATE TYPE "public"."enum_vendors_payment_terms" AS ENUM('Advance', '30 days', '45 days', '60 days', '90 days');
  CREATE TYPE "public"."enum_vendors_status" AS ENUM('draft', 'submitted', 'document_review', 'clarification', 'technical_review', 'compliance_review', 'approved', 'rejected', 'suspended');
  CREATE TYPE "public"."enum_vendors_risk_rating" AS ENUM('low', 'medium', 'high');
  CREATE TYPE "public"."enum_users_roles" AS ENUM('admin', 'editor', 'hr', 'procurement', 'analyst');
  CREATE TYPE "public"."enum_email_logs_status" AS ENUM('sent', 'failed', 'logged');
  CREATE TYPE "public"."enum_audit_logs_action" AS ENUM('create', 'update', 'publish', 'unpublish', 'delete');
  CREATE TYPE "public"."enum_redirects_to_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_redirects_type" AS ENUM('301', '302');
  CREATE TYPE "public"."enum_forms_blocks_choices_source" AS ENUM('divisions', 'custom');
  CREATE TYPE "public"."enum_forms_confirmation_type" AS ENUM('message', 'redirect');
  CREATE TYPE "public"."enum_forms_notify_inbox" AS ENUM('contact', 'quote', 'fallback', 'none');
  CREATE TYPE "public"."enum_forms_analytics_event" AS ENUM('form_submit', 'quote_request');
  CREATE TYPE "public"."enum_form_submissions_status" AS ENUM('new', 'progress', 'done', 'spam');
  CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'sendEmail', 'scoreApplication', 'rescoreJob', 'dailyMaintenance', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'sendEmail', 'scoreApplication', 'rescoreJob', 'dailyMaintenance', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_folders_folder_type" AS ENUM('media');
  CREATE TYPE "public"."enum_site_settings_social_profiles_platform" AS ENUM('linkedin', 'x', 'instagram', 'facebook', 'whatsapp', 'youtube');
  CREATE TYPE "public"."enum_site_settings_announcement_tone" AS ENUM('accent', 'navy');
  CREATE TYPE "public"."enum_header_top_bar_extra_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_header_nav_items_children_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_header_nav_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_header_nav_items_dropdown" AS ENUM('none', 'divisions', 'custom');
  CREATE TYPE "public"."enum_header_top_bar_vendor_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_header_cta_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_columns_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_columns_source" AS ENUM('custom', 'divisions');
  CREATE TYPE "public"."enum_footer_bottom_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_email_settings_smtp_security" AS ENUM('starttls', 'ssl', 'none');
  CREATE TYPE "public"."enum_integrations_ai_provider" AS ENUM('anthropic');
  CREATE TYPE "public"."enum_careers_settings_stage_emails_stage" AS ENUM('reviewing', 'shortlisted', 'interview', 'offer', 'hired', 'rejected');
  CREATE TYPE "public"."enum_vendor_settings_document_types_required_for" AS ENUM('manufacturer', 'distributor', 'subcontractor', 'service', 'consultant');
  CREATE TYPE "public"."enum_vendor_settings_status_emails_status" AS ENUM('draft', 'submitted', 'document_review', 'clarification', 'technical_review', 'compliance_review', 'approved', 'rejected', 'suspended');
  CREATE TABLE "pages_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_appearance" "enum_pages_hero_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "pages_hero_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_hero_panel_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" varchar
  );
  
  CREATE TABLE "pages_hero_panel_items_locales" (
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_hero_tiles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"highlight" boolean
  );
  
  CREATE TABLE "pages_hero_tiles_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_hero_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"suffix" varchar
  );
  
  CREATE TABLE "pages_hero_stats_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_divisions_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_divisions_grid_variant" DEFAULT 'cards',
  	"source" "enum_pages_blocks_divisions_grid_source" DEFAULT 'all',
  	"cta_card_enabled" boolean DEFAULT true,
  	"cta_card_link_type" "enum_pages_blocks_divisions_grid_cta_card_link_type" DEFAULT 'reference',
  	"cta_card_link_new_tab" boolean,
  	"cta_card_link_url" varchar,
  	"background" "enum_pages_blocks_divisions_grid_background" DEFAULT 'paper',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_divisions_grid_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"cta_card_eyebrow" varchar,
  	"cta_card_heading" varchar,
  	"cta_card_link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_process_steps_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_process_steps_steps_locales" (
  	"title" varchar,
  	"description" varchar,
  	"note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_process_steps_variant" DEFAULT 'timeline',
  	"background" "enum_pages_blocks_process_steps_background" DEFAULT 'navy',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_process_steps_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"side_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_feature_cards_cards_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_feature_cards_cards_items_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_feature_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_feature_cards_cards_icon",
  	"tone" "enum_pages_blocks_feature_cards_cards_tone" DEFAULT 'light',
  	"link_type" "enum_pages_blocks_feature_cards_cards_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar
  );
  
  CREATE TABLE "pages_blocks_feature_cards_cards_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"text" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_feature_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_feature_cards_variant" DEFAULT 'icon',
  	"columns" "enum_pages_blocks_feature_cards_columns" DEFAULT '3',
  	"background" "enum_pages_blocks_feature_cards_background" DEFAULT 'paper',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_feature_cards_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"suffix" varchar
  );
  
  CREATE TABLE "pages_blocks_stats_items_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_stats_variant" DEFAULT 'bar',
  	"background" "enum_pages_blocks_stats_background" DEFAULT 'white',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source" "enum_pages_blocks_logos_source" DEFAULT 'client',
  	"variant" "enum_pages_blocks_logos_variant" DEFAULT 'marquee',
  	"background" "enum_pages_blocks_logos_background" DEFAULT 'white',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_logos_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"side_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_appearance" "enum_pages_blocks_cta_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "pages_blocks_cta_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tone" "enum_pages_blocks_cta_tone" DEFAULT 'deep',
  	"show_phone" boolean,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"layout" "enum_pages_blocks_content_layout" DEFAULT 'split',
  	"background" "enum_pages_blocks_content_background" DEFAULT 'paper',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_content_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_chips_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_chips_items_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_chips" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_chips_variant" DEFAULT 'pills',
  	"background" "enum_pages_blocks_chips_background" DEFAULT 'white',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_chips_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"list_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_tabs_tabs_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_tabs_tabs_items_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_tabs_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_tabs_tabs_locales" (
  	"label" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"orientation" "enum_pages_blocks_tabs_orientation" DEFAULT 'horizontal',
  	"background" "enum_pages_blocks_tabs_background" DEFAULT 'paper',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_tabs_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_comparison_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_comparison_rows_locales" (
  	"label" varchar,
  	"a" varchar,
  	"b" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_comparison" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background" "enum_pages_blocks_comparison_background" DEFAULT 'navy',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_comparison_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"col1" varchar DEFAULT 'Criteria',
  	"col2" varchar,
  	"col3" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enable_schema" boolean DEFAULT true,
  	"background" "enum_pages_blocks_faq_background" DEFAULT 'paper',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_downloads" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background" "enum_pages_blocks_downloads_background" DEFAULT 'white',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_downloads_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background" "enum_pages_blocks_team_background" DEFAULT 'paper',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_team_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"size" "enum_pages_blocks_media_block_size" DEFAULT 'contained',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_media_block_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_image_text_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_image_text_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_appearance" "enum_pages_blocks_image_text_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "pages_blocks_image_text_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_image_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"image_position" "enum_pages_blocks_image_text_image_position" DEFAULT 'end',
  	"background" "enum_pages_blocks_image_text_background" DEFAULT 'white',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_image_text_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"layout" "enum_pages_blocks_form_block_layout" DEFAULT 'withContact',
  	"overlap_hero" boolean DEFAULT true,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_form_block_locales" (
  	"heading" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source" "enum_pages_blocks_projects_source" DEFAULT 'all',
  	"limit" numeric DEFAULT 9,
  	"show_featured" boolean DEFAULT true,
  	"background" "enum_pages_blocks_projects_background" DEFAULT 'paper',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_projects_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_jobs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"limit" numeric DEFAULT 50,
  	"show_filters" boolean DEFAULT true,
  	"background" "enum_pages_blocks_jobs_background" DEFAULT 'paper',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_jobs_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"empty_text" varchar DEFAULT 'There are no open positions right now. Send us your CV below and we will contact you when a matching role opens.',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_list_panel_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"highlight" boolean
  );
  
  CREATE TABLE "pages_blocks_list_panel_items_locales" (
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_list_panel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_list_panel_variant" DEFAULT 'stack',
  	"background" "enum_pages_blocks_list_panel_background" DEFAULT 'navy',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_list_panel_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_rfq_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_rfq_card_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_rfq_card_locales" (
  	"eyebrow" varchar DEFAULT 'FAST RFQ',
  	"heading" varchar,
  	"text" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_reusable" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"doc_id" integer,
  	"url" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_type" "enum_pages_hero_type" DEFAULT 'page',
  	"hero_visual" "enum_pages_hero_visual" DEFAULT 'none',
  	"hero_pattern" "enum_pages_hero_pattern" DEFAULT 'grid',
  	"hero_illustration" "enum_pages_hero_illustration",
  	"hero_media_id" integer,
  	"hero_show_division_links" boolean,
  	"meta_no_index" boolean,
  	"meta_canonical" varchar,
  	"published_at" timestamp(3) with time zone,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"path" varchar,
  	"parent_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_locales" (
  	"title" varchar,
  	"hero_eyebrow" varchar,
  	"hero_heading" varchar,
  	"hero_text" varchar,
  	"hero_panel_title" varchar,
  	"hero_panel_badge" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"meta_focus_keyword" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"divisions_id" integer,
  	"projects_id" integer,
  	"job_openings_id" integer,
  	"news_id" integer,
  	"partners_id" integer,
  	"documents_id" integer,
  	"team_members_id" integer
  );
  
  CREATE TABLE "_pages_v_version_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_version_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_appearance" "enum__pages_v_version_hero_links_link_appearance" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_hero_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_version_hero_panel_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_hero_panel_items_locales" (
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_version_hero_tiles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"highlight" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_hero_tiles_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_version_hero_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"suffix" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_hero_stats_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_divisions_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_divisions_grid_variant" DEFAULT 'cards',
  	"source" "enum__pages_v_blocks_divisions_grid_source" DEFAULT 'all',
  	"cta_card_enabled" boolean DEFAULT true,
  	"cta_card_link_type" "enum__pages_v_blocks_divisions_grid_cta_card_link_type" DEFAULT 'reference',
  	"cta_card_link_new_tab" boolean,
  	"cta_card_link_url" varchar,
  	"background" "enum__pages_v_blocks_divisions_grid_background" DEFAULT 'paper',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_divisions_grid_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"cta_card_eyebrow" varchar,
  	"cta_card_heading" varchar,
  	"cta_card_link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_process_steps_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_process_steps_steps_locales" (
  	"title" varchar,
  	"description" varchar,
  	"note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_process_steps_variant" DEFAULT 'timeline',
  	"background" "enum__pages_v_blocks_process_steps_background" DEFAULT 'navy',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_process_steps_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"side_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_feature_cards_cards_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature_cards_cards_items_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_feature_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_feature_cards_cards_icon",
  	"tone" "enum__pages_v_blocks_feature_cards_cards_tone" DEFAULT 'light',
  	"link_type" "enum__pages_v_blocks_feature_cards_cards_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature_cards_cards_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"text" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_feature_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_feature_cards_variant" DEFAULT 'icon',
  	"columns" "enum__pages_v_blocks_feature_cards_columns" DEFAULT '3',
  	"background" "enum__pages_v_blocks_feature_cards_background" DEFAULT 'paper',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature_cards_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"suffix" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats_items_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_stats_variant" DEFAULT 'bar',
  	"background" "enum__pages_v_blocks_stats_background" DEFAULT 'white',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"source" "enum__pages_v_blocks_logos_source" DEFAULT 'client',
  	"variant" "enum__pages_v_blocks_logos_variant" DEFAULT 'marquee',
  	"background" "enum__pages_v_blocks_logos_background" DEFAULT 'white',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_logos_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"side_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_appearance" "enum__pages_v_blocks_cta_links_link_appearance" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tone" "enum__pages_v_blocks_cta_tone" DEFAULT 'deep',
  	"show_phone" boolean,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"layout" "enum__pages_v_blocks_content_layout" DEFAULT 'split',
  	"background" "enum__pages_v_blocks_content_background" DEFAULT 'paper',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_content_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_chips_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_chips_items_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_chips" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_chips_variant" DEFAULT 'pills',
  	"background" "enum__pages_v_blocks_chips_background" DEFAULT 'white',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_chips_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"list_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_tabs_tabs_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_tabs_tabs_items_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_tabs_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_tabs_tabs_locales" (
  	"label" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"orientation" "enum__pages_v_blocks_tabs_orientation" DEFAULT 'horizontal',
  	"background" "enum__pages_v_blocks_tabs_background" DEFAULT 'paper',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_tabs_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_comparison_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_comparison_rows_locales" (
  	"label" varchar,
  	"a" varchar,
  	"b" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_comparison" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background" "enum__pages_v_blocks_comparison_background" DEFAULT 'navy',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_comparison_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"col1" varchar DEFAULT 'Criteria',
  	"col2" varchar,
  	"col3" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enable_schema" boolean DEFAULT true,
  	"background" "enum__pages_v_blocks_faq_background" DEFAULT 'paper',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_downloads" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background" "enum__pages_v_blocks_downloads_background" DEFAULT 'white',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_downloads_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background" "enum__pages_v_blocks_team_background" DEFAULT 'paper',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_team_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"size" "enum__pages_v_blocks_media_block_size" DEFAULT 'contained',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_media_block_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_image_text_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_image_text_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_appearance" "enum__pages_v_blocks_image_text_links_link_appearance" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_image_text_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_image_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"image_position" "enum__pages_v_blocks_image_text_image_position" DEFAULT 'end',
  	"background" "enum__pages_v_blocks_image_text_background" DEFAULT 'white',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_image_text_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"layout" "enum__pages_v_blocks_form_block_layout" DEFAULT 'withContact',
  	"overlap_hero" boolean DEFAULT true,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_form_block_locales" (
  	"heading" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"source" "enum__pages_v_blocks_projects_source" DEFAULT 'all',
  	"limit" numeric DEFAULT 9,
  	"show_featured" boolean DEFAULT true,
  	"background" "enum__pages_v_blocks_projects_background" DEFAULT 'paper',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_projects_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_jobs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"limit" numeric DEFAULT 50,
  	"show_filters" boolean DEFAULT true,
  	"background" "enum__pages_v_blocks_jobs_background" DEFAULT 'paper',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_jobs_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"empty_text" varchar DEFAULT 'There are no open positions right now. Send us your CV below and we will contact you when a matching role opens.',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_list_panel_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"highlight" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_list_panel_items_locales" (
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_list_panel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_list_panel_variant" DEFAULT 'stack',
  	"background" "enum__pages_v_blocks_list_panel_background" DEFAULT 'navy',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_list_panel_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_rfq_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_rfq_card_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_rfq_card_locales" (
  	"eyebrow" varchar DEFAULT 'FAST RFQ',
  	"heading" varchar,
  	"text" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_reusable" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_version_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"doc_id" integer,
  	"url" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_hero_type" "enum__pages_v_version_hero_type" DEFAULT 'page',
  	"version_hero_visual" "enum__pages_v_version_hero_visual" DEFAULT 'none',
  	"version_hero_pattern" "enum__pages_v_version_hero_pattern" DEFAULT 'grid',
  	"version_hero_illustration" "enum__pages_v_version_hero_illustration",
  	"version_hero_media_id" integer,
  	"version_hero_show_division_links" boolean,
  	"version_meta_no_index" boolean,
  	"version_meta_canonical" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_path" varchar,
  	"version_parent_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__pages_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_pages_v_locales" (
  	"version_title" varchar,
  	"version_hero_eyebrow" varchar,
  	"version_hero_heading" varchar,
  	"version_hero_text" varchar,
  	"version_hero_panel_title" varchar,
  	"version_hero_panel_badge" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_focus_keyword" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"divisions_id" integer,
  	"projects_id" integer,
  	"job_openings_id" integer,
  	"news_id" integer,
  	"partners_id" integer,
  	"documents_id" integer,
  	"team_members_id" integer
  );
  
  CREATE TABLE "divisions_chips" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "divisions_chips_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "divisions_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_divisions_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_appearance" "enum_divisions_hero_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "divisions_hero_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "divisions_hero_panel_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" varchar
  );
  
  CREATE TABLE "divisions_hero_panel_items_locales" (
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "divisions_hero_tiles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"highlight" boolean
  );
  
  CREATE TABLE "divisions_hero_tiles_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "divisions_hero_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"suffix" varchar
  );
  
  CREATE TABLE "divisions_hero_stats_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "divisions_blocks_divisions_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_divisions_blocks_divisions_grid_variant" DEFAULT 'cards',
  	"source" "enum_divisions_blocks_divisions_grid_source" DEFAULT 'all',
  	"cta_card_enabled" boolean DEFAULT true,
  	"cta_card_link_type" "enum_divisions_blocks_divisions_grid_cta_card_link_type" DEFAULT 'reference',
  	"cta_card_link_new_tab" boolean,
  	"cta_card_link_url" varchar,
  	"background" "enum_divisions_blocks_divisions_grid_background" DEFAULT 'paper',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "divisions_blocks_divisions_grid_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"cta_card_eyebrow" varchar,
  	"cta_card_heading" varchar,
  	"cta_card_link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "divisions_blocks_process_steps_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "divisions_blocks_process_steps_steps_locales" (
  	"title" varchar,
  	"description" varchar,
  	"note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "divisions_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_divisions_blocks_process_steps_variant" DEFAULT 'timeline',
  	"background" "enum_divisions_blocks_process_steps_background" DEFAULT 'navy',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "divisions_blocks_process_steps_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"side_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "divisions_blocks_feature_cards_cards_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "divisions_blocks_feature_cards_cards_items_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "divisions_blocks_feature_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_divisions_blocks_feature_cards_cards_icon",
  	"tone" "enum_divisions_blocks_feature_cards_cards_tone" DEFAULT 'light',
  	"link_type" "enum_divisions_blocks_feature_cards_cards_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar
  );
  
  CREATE TABLE "divisions_blocks_feature_cards_cards_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"text" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "divisions_blocks_feature_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_divisions_blocks_feature_cards_variant" DEFAULT 'icon',
  	"columns" "enum_divisions_blocks_feature_cards_columns" DEFAULT '3',
  	"background" "enum_divisions_blocks_feature_cards_background" DEFAULT 'paper',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "divisions_blocks_feature_cards_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "divisions_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"suffix" varchar
  );
  
  CREATE TABLE "divisions_blocks_stats_items_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "divisions_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_divisions_blocks_stats_variant" DEFAULT 'bar',
  	"background" "enum_divisions_blocks_stats_background" DEFAULT 'white',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "divisions_blocks_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source" "enum_divisions_blocks_logos_source" DEFAULT 'client',
  	"variant" "enum_divisions_blocks_logos_variant" DEFAULT 'marquee',
  	"background" "enum_divisions_blocks_logos_background" DEFAULT 'white',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "divisions_blocks_logos_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"side_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "divisions_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_divisions_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_appearance" "enum_divisions_blocks_cta_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "divisions_blocks_cta_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "divisions_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tone" "enum_divisions_blocks_cta_tone" DEFAULT 'deep',
  	"show_phone" boolean,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "divisions_blocks_cta_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "divisions_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"layout" "enum_divisions_blocks_content_layout" DEFAULT 'split',
  	"background" "enum_divisions_blocks_content_background" DEFAULT 'paper',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "divisions_blocks_content_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "divisions_blocks_chips_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "divisions_blocks_chips_items_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "divisions_blocks_chips" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_divisions_blocks_chips_variant" DEFAULT 'pills',
  	"background" "enum_divisions_blocks_chips_background" DEFAULT 'white',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "divisions_blocks_chips_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"list_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "divisions_blocks_tabs_tabs_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "divisions_blocks_tabs_tabs_items_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "divisions_blocks_tabs_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "divisions_blocks_tabs_tabs_locales" (
  	"label" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "divisions_blocks_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"orientation" "enum_divisions_blocks_tabs_orientation" DEFAULT 'horizontal',
  	"background" "enum_divisions_blocks_tabs_background" DEFAULT 'paper',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "divisions_blocks_tabs_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "divisions_blocks_comparison_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "divisions_blocks_comparison_rows_locales" (
  	"label" varchar,
  	"a" varchar,
  	"b" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "divisions_blocks_comparison" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background" "enum_divisions_blocks_comparison_background" DEFAULT 'navy',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "divisions_blocks_comparison_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"col1" varchar DEFAULT 'Criteria',
  	"col2" varchar,
  	"col3" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "divisions_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "divisions_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "divisions_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enable_schema" boolean DEFAULT true,
  	"background" "enum_divisions_blocks_faq_background" DEFAULT 'paper',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "divisions_blocks_faq_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "divisions_blocks_downloads" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background" "enum_divisions_blocks_downloads_background" DEFAULT 'white',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "divisions_blocks_downloads_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "divisions_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background" "enum_divisions_blocks_team_background" DEFAULT 'paper',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "divisions_blocks_team_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "divisions_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"size" "enum_divisions_blocks_media_block_size" DEFAULT 'contained',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "divisions_blocks_media_block_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "divisions_blocks_image_text_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_divisions_blocks_image_text_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_appearance" "enum_divisions_blocks_image_text_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "divisions_blocks_image_text_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "divisions_blocks_image_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"image_position" "enum_divisions_blocks_image_text_image_position" DEFAULT 'end',
  	"background" "enum_divisions_blocks_image_text_background" DEFAULT 'white',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "divisions_blocks_image_text_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "divisions_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"layout" "enum_divisions_blocks_form_block_layout" DEFAULT 'withContact',
  	"overlap_hero" boolean DEFAULT true,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "divisions_blocks_form_block_locales" (
  	"heading" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "divisions_blocks_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source" "enum_divisions_blocks_projects_source" DEFAULT 'all',
  	"limit" numeric DEFAULT 9,
  	"show_featured" boolean DEFAULT true,
  	"background" "enum_divisions_blocks_projects_background" DEFAULT 'paper',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "divisions_blocks_projects_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "divisions_blocks_jobs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"limit" numeric DEFAULT 50,
  	"show_filters" boolean DEFAULT true,
  	"background" "enum_divisions_blocks_jobs_background" DEFAULT 'paper',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "divisions_blocks_jobs_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"empty_text" varchar DEFAULT 'There are no open positions right now. Send us your CV below and we will contact you when a matching role opens.',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "divisions_blocks_list_panel_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"highlight" boolean
  );
  
  CREATE TABLE "divisions_blocks_list_panel_items_locales" (
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "divisions_blocks_list_panel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_divisions_blocks_list_panel_variant" DEFAULT 'stack',
  	"background" "enum_divisions_blocks_list_panel_background" DEFAULT 'navy',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "divisions_blocks_list_panel_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "divisions_blocks_rfq_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_divisions_blocks_rfq_card_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "divisions_blocks_rfq_card_locales" (
  	"eyebrow" varchar DEFAULT 'FAST RFQ',
  	"heading" varchar,
  	"text" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "divisions_blocks_reusable" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "divisions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"icon" "enum_divisions_icon",
  	"is_new" boolean,
  	"card_image_id" integer,
  	"hero_type" "enum_divisions_hero_type" DEFAULT 'page',
  	"hero_visual" "enum_divisions_hero_visual" DEFAULT 'none',
  	"hero_pattern" "enum_divisions_hero_pattern" DEFAULT 'grid',
  	"hero_illustration" "enum_divisions_hero_illustration",
  	"hero_media_id" integer,
  	"hero_show_division_links" boolean,
  	"show_other_divisions" boolean DEFAULT true,
  	"meta_no_index" boolean,
  	"meta_canonical" varchar,
  	"order" numeric DEFAULT 10,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_divisions_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "divisions_locales" (
  	"title" varchar,
  	"short_title" varchar,
  	"category" varchar,
  	"summary" varchar,
  	"hero_eyebrow" varchar,
  	"hero_heading" varchar,
  	"hero_text" varchar,
  	"hero_panel_title" varchar,
  	"hero_panel_badge" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"meta_focus_keyword" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "divisions_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"divisions_id" integer,
  	"projects_id" integer,
  	"job_openings_id" integer,
  	"news_id" integer,
  	"partners_id" integer,
  	"documents_id" integer,
  	"team_members_id" integer
  );
  
  CREATE TABLE "_divisions_v_version_chips" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_divisions_v_version_chips_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_divisions_v_version_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__divisions_v_version_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_appearance" "enum__divisions_v_version_hero_links_link_appearance" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_divisions_v_version_hero_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_divisions_v_version_hero_panel_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_divisions_v_version_hero_panel_items_locales" (
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_divisions_v_version_hero_tiles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"highlight" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_divisions_v_version_hero_tiles_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_divisions_v_version_hero_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"suffix" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_divisions_v_version_hero_stats_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_divisions_v_blocks_divisions_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__divisions_v_blocks_divisions_grid_variant" DEFAULT 'cards',
  	"source" "enum__divisions_v_blocks_divisions_grid_source" DEFAULT 'all',
  	"cta_card_enabled" boolean DEFAULT true,
  	"cta_card_link_type" "enum__divisions_v_blocks_divisions_grid_cta_card_link_type" DEFAULT 'reference',
  	"cta_card_link_new_tab" boolean,
  	"cta_card_link_url" varchar,
  	"background" "enum__divisions_v_blocks_divisions_grid_background" DEFAULT 'paper',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_divisions_v_blocks_divisions_grid_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"cta_card_eyebrow" varchar,
  	"cta_card_heading" varchar,
  	"cta_card_link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_divisions_v_blocks_process_steps_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_divisions_v_blocks_process_steps_steps_locales" (
  	"title" varchar,
  	"description" varchar,
  	"note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_divisions_v_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__divisions_v_blocks_process_steps_variant" DEFAULT 'timeline',
  	"background" "enum__divisions_v_blocks_process_steps_background" DEFAULT 'navy',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_divisions_v_blocks_process_steps_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"side_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_divisions_v_blocks_feature_cards_cards_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_divisions_v_blocks_feature_cards_cards_items_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_divisions_v_blocks_feature_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__divisions_v_blocks_feature_cards_cards_icon",
  	"tone" "enum__divisions_v_blocks_feature_cards_cards_tone" DEFAULT 'light',
  	"link_type" "enum__divisions_v_blocks_feature_cards_cards_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_divisions_v_blocks_feature_cards_cards_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"text" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_divisions_v_blocks_feature_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__divisions_v_blocks_feature_cards_variant" DEFAULT 'icon',
  	"columns" "enum__divisions_v_blocks_feature_cards_columns" DEFAULT '3',
  	"background" "enum__divisions_v_blocks_feature_cards_background" DEFAULT 'paper',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_divisions_v_blocks_feature_cards_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_divisions_v_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"suffix" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_divisions_v_blocks_stats_items_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_divisions_v_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__divisions_v_blocks_stats_variant" DEFAULT 'bar',
  	"background" "enum__divisions_v_blocks_stats_background" DEFAULT 'white',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_divisions_v_blocks_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"source" "enum__divisions_v_blocks_logos_source" DEFAULT 'client',
  	"variant" "enum__divisions_v_blocks_logos_variant" DEFAULT 'marquee',
  	"background" "enum__divisions_v_blocks_logos_background" DEFAULT 'white',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_divisions_v_blocks_logos_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"side_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_divisions_v_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__divisions_v_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_appearance" "enum__divisions_v_blocks_cta_links_link_appearance" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_divisions_v_blocks_cta_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_divisions_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tone" "enum__divisions_v_blocks_cta_tone" DEFAULT 'deep',
  	"show_phone" boolean,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_divisions_v_blocks_cta_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_divisions_v_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"layout" "enum__divisions_v_blocks_content_layout" DEFAULT 'split',
  	"background" "enum__divisions_v_blocks_content_background" DEFAULT 'paper',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_divisions_v_blocks_content_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_divisions_v_blocks_chips_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_divisions_v_blocks_chips_items_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_divisions_v_blocks_chips" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__divisions_v_blocks_chips_variant" DEFAULT 'pills',
  	"background" "enum__divisions_v_blocks_chips_background" DEFAULT 'white',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_divisions_v_blocks_chips_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"list_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_divisions_v_blocks_tabs_tabs_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_divisions_v_blocks_tabs_tabs_items_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_divisions_v_blocks_tabs_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_divisions_v_blocks_tabs_tabs_locales" (
  	"label" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_divisions_v_blocks_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"orientation" "enum__divisions_v_blocks_tabs_orientation" DEFAULT 'horizontal',
  	"background" "enum__divisions_v_blocks_tabs_background" DEFAULT 'paper',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_divisions_v_blocks_tabs_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_divisions_v_blocks_comparison_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_divisions_v_blocks_comparison_rows_locales" (
  	"label" varchar,
  	"a" varchar,
  	"b" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_divisions_v_blocks_comparison" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background" "enum__divisions_v_blocks_comparison_background" DEFAULT 'navy',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_divisions_v_blocks_comparison_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"col1" varchar DEFAULT 'Criteria',
  	"col2" varchar,
  	"col3" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_divisions_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_divisions_v_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_divisions_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enable_schema" boolean DEFAULT true,
  	"background" "enum__divisions_v_blocks_faq_background" DEFAULT 'paper',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_divisions_v_blocks_faq_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_divisions_v_blocks_downloads" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background" "enum__divisions_v_blocks_downloads_background" DEFAULT 'white',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_divisions_v_blocks_downloads_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_divisions_v_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background" "enum__divisions_v_blocks_team_background" DEFAULT 'paper',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_divisions_v_blocks_team_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_divisions_v_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"size" "enum__divisions_v_blocks_media_block_size" DEFAULT 'contained',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_divisions_v_blocks_media_block_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_divisions_v_blocks_image_text_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__divisions_v_blocks_image_text_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_appearance" "enum__divisions_v_blocks_image_text_links_link_appearance" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_divisions_v_blocks_image_text_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_divisions_v_blocks_image_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"image_position" "enum__divisions_v_blocks_image_text_image_position" DEFAULT 'end',
  	"background" "enum__divisions_v_blocks_image_text_background" DEFAULT 'white',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_divisions_v_blocks_image_text_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_divisions_v_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"layout" "enum__divisions_v_blocks_form_block_layout" DEFAULT 'withContact',
  	"overlap_hero" boolean DEFAULT true,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_divisions_v_blocks_form_block_locales" (
  	"heading" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_divisions_v_blocks_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"source" "enum__divisions_v_blocks_projects_source" DEFAULT 'all',
  	"limit" numeric DEFAULT 9,
  	"show_featured" boolean DEFAULT true,
  	"background" "enum__divisions_v_blocks_projects_background" DEFAULT 'paper',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_divisions_v_blocks_projects_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_divisions_v_blocks_jobs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"limit" numeric DEFAULT 50,
  	"show_filters" boolean DEFAULT true,
  	"background" "enum__divisions_v_blocks_jobs_background" DEFAULT 'paper',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_divisions_v_blocks_jobs_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"empty_text" varchar DEFAULT 'There are no open positions right now. Send us your CV below and we will contact you when a matching role opens.',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_divisions_v_blocks_list_panel_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"highlight" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_divisions_v_blocks_list_panel_items_locales" (
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_divisions_v_blocks_list_panel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__divisions_v_blocks_list_panel_variant" DEFAULT 'stack',
  	"background" "enum__divisions_v_blocks_list_panel_background" DEFAULT 'navy',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_divisions_v_blocks_list_panel_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_divisions_v_blocks_rfq_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__divisions_v_blocks_rfq_card_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_divisions_v_blocks_rfq_card_locales" (
  	"eyebrow" varchar DEFAULT 'FAST RFQ',
  	"heading" varchar,
  	"text" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_divisions_v_blocks_reusable" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_divisions_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_number" varchar,
  	"version_icon" "enum__divisions_v_version_icon",
  	"version_is_new" boolean,
  	"version_card_image_id" integer,
  	"version_hero_type" "enum__divisions_v_version_hero_type" DEFAULT 'page',
  	"version_hero_visual" "enum__divisions_v_version_hero_visual" DEFAULT 'none',
  	"version_hero_pattern" "enum__divisions_v_version_hero_pattern" DEFAULT 'grid',
  	"version_hero_illustration" "enum__divisions_v_version_hero_illustration",
  	"version_hero_media_id" integer,
  	"version_hero_show_division_links" boolean,
  	"version_show_other_divisions" boolean DEFAULT true,
  	"version_meta_no_index" boolean,
  	"version_meta_canonical" varchar,
  	"version_order" numeric DEFAULT 10,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__divisions_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__divisions_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_divisions_v_locales" (
  	"version_title" varchar,
  	"version_short_title" varchar,
  	"version_category" varchar,
  	"version_summary" varchar,
  	"version_hero_eyebrow" varchar,
  	"version_hero_heading" varchar,
  	"version_hero_text" varchar,
  	"version_hero_panel_title" varchar,
  	"version_hero_panel_badge" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_focus_keyword" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_divisions_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"divisions_id" integer,
  	"projects_id" integer,
  	"job_openings_id" integer,
  	"news_id" integer,
  	"partners_id" integer,
  	"documents_id" integer,
  	"team_members_id" integer
  );
  
  CREATE TABLE "projects_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "projects_metrics_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"client" varchar,
  	"year" numeric,
  	"value" varchar,
  	"duration" varchar,
  	"cover_image_id" integer,
  	"meta_no_index" boolean,
  	"meta_canonical" varchar,
  	"featured" boolean,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_projects_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "projects_locales" (
  	"title" varchar,
  	"location" varchar,
  	"summary" varchar,
  	"challenge" varchar,
  	"solution" varchar,
  	"result" varchar,
  	"content" jsonb,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"meta_focus_keyword" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "projects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"divisions_id" integer,
  	"media_id" integer
  );
  
  CREATE TABLE "_projects_v_version_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_version_metrics_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_client" varchar,
  	"version_year" numeric,
  	"version_value" varchar,
  	"version_duration" varchar,
  	"version_cover_image_id" integer,
  	"version_meta_no_index" boolean,
  	"version_meta_canonical" varchar,
  	"version_featured" boolean,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__projects_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__projects_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_projects_v_locales" (
  	"version_title" varchar,
  	"version_location" varchar,
  	"version_summary" varchar,
  	"version_challenge" varchar,
  	"version_solution" varchar,
  	"version_result" varchar,
  	"version_content" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_focus_keyword" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"divisions_id" integer,
  	"media_id" integer
  );
  
  CREATE TABLE "news" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"cover_image_id" integer,
  	"meta_no_index" boolean,
  	"meta_canonical" varchar,
  	"category" "enum_news_category" DEFAULT 'news',
  	"author_id" integer,
  	"published_at" timestamp(3) with time zone,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_news_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "news_locales" (
  	"title" varchar,
  	"excerpt" varchar,
  	"content" jsonb,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"meta_focus_keyword" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_news_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_cover_image_id" integer,
  	"version_meta_no_index" boolean,
  	"version_meta_canonical" varchar,
  	"version_category" "enum__news_v_version_category" DEFAULT 'news',
  	"version_author_id" integer,
  	"version_published_at" timestamp(3) with time zone,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__news_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__news_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_news_v_locales" (
  	"version_title" varchar,
  	"version_excerpt" varchar,
  	"version_content" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_focus_keyword" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "partners" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"type" "enum_partners_type" DEFAULT 'client' NOT NULL,
  	"order" numeric DEFAULT 10,
  	"logo_id" integer,
  	"url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "team_members" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"photo_id" integer,
  	"linkedin" varchar,
  	"order" numeric DEFAULT 10,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "team_members_locales" (
  	"name" varchar NOT NULL,
  	"role" varchar,
  	"bio" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"category" "enum_documents_category",
  	"revision" varchar,
  	"prefix" varchar DEFAULT 'documents',
  	"_objectkey" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "documents_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "reusable_blocks_blocks_divisions_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_reusable_blocks_blocks_divisions_grid_variant" DEFAULT 'cards',
  	"source" "enum_reusable_blocks_blocks_divisions_grid_source" DEFAULT 'all',
  	"cta_card_enabled" boolean DEFAULT true,
  	"cta_card_link_type" "enum_reusable_blocks_blocks_divisions_grid_cta_card_link_type" DEFAULT 'reference',
  	"cta_card_link_new_tab" boolean,
  	"cta_card_link_url" varchar,
  	"background" "enum_reusable_blocks_blocks_divisions_grid_background" DEFAULT 'paper',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "reusable_blocks_blocks_divisions_grid_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"cta_card_eyebrow" varchar,
  	"cta_card_heading" varchar,
  	"cta_card_link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "reusable_blocks_blocks_process_steps_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "reusable_blocks_blocks_process_steps_steps_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "reusable_blocks_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_reusable_blocks_blocks_process_steps_variant" DEFAULT 'timeline',
  	"background" "enum_reusable_blocks_blocks_process_steps_background" DEFAULT 'navy',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "reusable_blocks_blocks_process_steps_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"side_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "reusable_blocks_blocks_feature_cards_cards_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "reusable_blocks_blocks_feature_cards_cards_items_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "reusable_blocks_blocks_feature_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_reusable_blocks_blocks_feature_cards_cards_icon",
  	"tone" "enum_reusable_blocks_blocks_feature_cards_cards_tone" DEFAULT 'light',
  	"link_type" "enum_reusable_blocks_blocks_feature_cards_cards_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar
  );
  
  CREATE TABLE "reusable_blocks_blocks_feature_cards_cards_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"text" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "reusable_blocks_blocks_feature_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_reusable_blocks_blocks_feature_cards_variant" DEFAULT 'icon',
  	"columns" "enum_reusable_blocks_blocks_feature_cards_columns" DEFAULT '3',
  	"background" "enum_reusable_blocks_blocks_feature_cards_background" DEFAULT 'paper',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "reusable_blocks_blocks_feature_cards_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "reusable_blocks_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"suffix" varchar
  );
  
  CREATE TABLE "reusable_blocks_blocks_stats_items_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "reusable_blocks_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_reusable_blocks_blocks_stats_variant" DEFAULT 'bar',
  	"background" "enum_reusable_blocks_blocks_stats_background" DEFAULT 'white',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "reusable_blocks_blocks_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source" "enum_reusable_blocks_blocks_logos_source" DEFAULT 'client',
  	"variant" "enum_reusable_blocks_blocks_logos_variant" DEFAULT 'marquee',
  	"background" "enum_reusable_blocks_blocks_logos_background" DEFAULT 'white',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "reusable_blocks_blocks_logos_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"side_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "reusable_blocks_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_reusable_blocks_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_appearance" "enum_reusable_blocks_blocks_cta_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "reusable_blocks_blocks_cta_links_locales" (
  	"link_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "reusable_blocks_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tone" "enum_reusable_blocks_blocks_cta_tone" DEFAULT 'deep',
  	"show_phone" boolean,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "reusable_blocks_blocks_cta_locales" (
  	"eyebrow" varchar,
  	"heading" varchar NOT NULL,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "reusable_blocks_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"layout" "enum_reusable_blocks_blocks_content_layout" DEFAULT 'split',
  	"background" "enum_reusable_blocks_blocks_content_background" DEFAULT 'paper',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "reusable_blocks_blocks_content_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "reusable_blocks_blocks_chips_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "reusable_blocks_blocks_chips_items_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "reusable_blocks_blocks_chips" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_reusable_blocks_blocks_chips_variant" DEFAULT 'pills',
  	"background" "enum_reusable_blocks_blocks_chips_background" DEFAULT 'white',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "reusable_blocks_blocks_chips_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"list_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "reusable_blocks_blocks_tabs_tabs_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "reusable_blocks_blocks_tabs_tabs_items_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "reusable_blocks_blocks_tabs_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "reusable_blocks_blocks_tabs_tabs_locales" (
  	"label" varchar NOT NULL,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "reusable_blocks_blocks_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"orientation" "enum_reusable_blocks_blocks_tabs_orientation" DEFAULT 'horizontal',
  	"background" "enum_reusable_blocks_blocks_tabs_background" DEFAULT 'paper',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "reusable_blocks_blocks_tabs_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "reusable_blocks_blocks_comparison_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "reusable_blocks_blocks_comparison_rows_locales" (
  	"label" varchar NOT NULL,
  	"a" varchar,
  	"b" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "reusable_blocks_blocks_comparison" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background" "enum_reusable_blocks_blocks_comparison_background" DEFAULT 'navy',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "reusable_blocks_blocks_comparison_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"col1" varchar DEFAULT 'Criteria',
  	"col2" varchar,
  	"col3" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "reusable_blocks_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "reusable_blocks_blocks_faq_items_locales" (
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "reusable_blocks_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enable_schema" boolean DEFAULT true,
  	"background" "enum_reusable_blocks_blocks_faq_background" DEFAULT 'paper',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "reusable_blocks_blocks_faq_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "reusable_blocks_blocks_downloads" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background" "enum_reusable_blocks_blocks_downloads_background" DEFAULT 'white',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "reusable_blocks_blocks_downloads_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "reusable_blocks_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background" "enum_reusable_blocks_blocks_team_background" DEFAULT 'paper',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "reusable_blocks_blocks_team_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "reusable_blocks_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer NOT NULL,
  	"size" "enum_reusable_blocks_blocks_media_block_size" DEFAULT 'contained',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "reusable_blocks_blocks_media_block_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "reusable_blocks_blocks_image_text_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_reusable_blocks_blocks_image_text_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_appearance" "enum_reusable_blocks_blocks_image_text_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "reusable_blocks_blocks_image_text_links_locales" (
  	"link_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "reusable_blocks_blocks_image_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"image_position" "enum_reusable_blocks_blocks_image_text_image_position" DEFAULT 'end',
  	"background" "enum_reusable_blocks_blocks_image_text_background" DEFAULT 'white',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "reusable_blocks_blocks_image_text_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "reusable_blocks_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" integer NOT NULL,
  	"layout" "enum_reusable_blocks_blocks_form_block_layout" DEFAULT 'withContact',
  	"overlap_hero" boolean DEFAULT true,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "reusable_blocks_blocks_form_block_locales" (
  	"heading" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "reusable_blocks_blocks_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source" "enum_reusable_blocks_blocks_projects_source" DEFAULT 'all',
  	"limit" numeric DEFAULT 9,
  	"show_featured" boolean DEFAULT true,
  	"background" "enum_reusable_blocks_blocks_projects_background" DEFAULT 'paper',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "reusable_blocks_blocks_projects_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "reusable_blocks_blocks_jobs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"limit" numeric DEFAULT 50,
  	"show_filters" boolean DEFAULT true,
  	"background" "enum_reusable_blocks_blocks_jobs_background" DEFAULT 'paper',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "reusable_blocks_blocks_jobs_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"empty_text" varchar DEFAULT 'There are no open positions right now. Send us your CV below and we will contact you when a matching role opens.',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "reusable_blocks_blocks_list_panel_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"highlight" boolean
  );
  
  CREATE TABLE "reusable_blocks_blocks_list_panel_items_locales" (
  	"title" varchar NOT NULL,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "reusable_blocks_blocks_list_panel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_reusable_blocks_blocks_list_panel_variant" DEFAULT 'stack',
  	"background" "enum_reusable_blocks_blocks_list_panel_background" DEFAULT 'navy',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "reusable_blocks_blocks_list_panel_locales" (
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "reusable_blocks_blocks_rfq_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_reusable_blocks_blocks_rfq_card_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "reusable_blocks_blocks_rfq_card_locales" (
  	"eyebrow" varchar DEFAULT 'FAST RFQ',
  	"heading" varchar NOT NULL,
  	"text" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "reusable_blocks" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "reusable_blocks_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"divisions_id" integer,
  	"pages_id" integer,
  	"projects_id" integer,
  	"job_openings_id" integer,
  	"news_id" integer,
  	"partners_id" integer,
  	"documents_id" integer,
  	"team_members_id" integer
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"credit" varchar,
  	"prefix" varchar DEFAULT 'media',
  	"_objectkey" varchar,
  	"folder_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar,
  	"sizes_og_url" varchar,
  	"sizes_og_width" numeric,
  	"sizes_og_height" numeric,
  	"sizes_og_mime_type" varchar,
  	"sizes_og_filesize" numeric,
  	"sizes_og_filename" varchar
  );
  
  CREATE TABLE "media_locales" (
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "form_files" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"original_name" varchar,
  	"prefix" varchar DEFAULT 'form-files',
  	"_objectkey" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "job_openings_responsibilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "job_openings_responsibilities_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "job_openings_requirements" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "job_openings_requirements_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "job_openings_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "job_openings_benefits_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "job_openings_skills" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"skill" varchar NOT NULL,
  	"weight" "enum_job_openings_skills_weight" DEFAULT '3',
  	"must_have" boolean,
  	"synonyms" varchar
  );
  
  CREATE TABLE "job_openings_certifications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"synonyms" varchar,
  	"must_have" boolean
  );
  
  CREATE TABLE "job_openings_screening_questions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_job_openings_screening_questions_type" DEFAULT 'yesno',
  	"ideal_answer" varchar,
  	"weight" "enum_job_openings_screening_questions_weight" DEFAULT '3',
  	"knockout" boolean,
  	"required" boolean DEFAULT true
  );
  
  CREATE TABLE "job_openings_screening_questions_locales" (
  	"question" varchar NOT NULL,
  	"options" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "job_openings_notify_recipients" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL
  );
  
  CREATE TABLE "job_openings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"division_id" integer,
  	"employment_type" "enum_job_openings_employment_type" DEFAULT 'full-time',
  	"workplace" "enum_job_openings_workplace" DEFAULT 'onsite',
  	"openings" numeric DEFAULT 1,
  	"education_level" "enum_job_openings_education_level" DEFAULT 'none',
  	"experience_min" numeric,
  	"experience_max" numeric,
  	"salary_min" numeric,
  	"salary_max" numeric,
  	"show_salary" boolean,
  	"keywords" varchar,
  	"hiring_manager_id" integer,
  	"meta_no_index" boolean,
  	"meta_canonical" varchar,
  	"status" "enum_job_openings_status" DEFAULT 'draft' NOT NULL,
  	"listed" boolean DEFAULT true,
  	"posted_at" timestamp(3) with time zone,
  	"closes_at" timestamp(3) with time zone,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "job_openings_locales" (
  	"title" varchar NOT NULL,
  	"department" varchar,
  	"location" varchar DEFAULT 'Dammam, Saudi Arabia',
  	"summary" varchar,
  	"description" jsonb,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"meta_focus_keyword" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "applications_screening_answers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"passed" boolean
  );
  
  CREATE TABLE "applications_notes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"note" varchar NOT NULL,
  	"author_id" integer,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "applications_activity" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"at" timestamp(3) with time zone,
  	"event" varchar,
  	"by" varchar
  );
  
  CREATE TABLE "applications_tags" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_applications_tags",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "applications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"first_name" varchar NOT NULL,
  	"last_name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"current_title" varchar,
  	"current_employer" varchar,
  	"location" varchar,
  	"years_experience" numeric,
  	"education_level" "enum_applications_education_level",
  	"field_of_study" varchar,
  	"notice_period" "enum_applications_notice_period",
  	"skills_text" varchar,
  	"certifications_text" varchar,
  	"languages" varchar,
  	"linkedin" varchar,
  	"expected_salary" varchar,
  	"cover_letter" varchar,
  	"resume_id" integer,
  	"match_breakdown" jsonb,
  	"matched_skills" varchar,
  	"missing_skills" varchar,
  	"ai_summary" varchar,
  	"ai_score" numeric,
  	"resume_text" varchar,
  	"scored_at" timestamp(3) with time zone,
  	"source" varchar,
  	"country" varchar,
  	"consent_at" timestamp(3) with time zone,
  	"job_id" integer NOT NULL,
  	"stage" "enum_applications_stage" DEFAULT 'new',
  	"rejection_reason" "enum_applications_rejection_reason",
  	"send_stage_email" boolean DEFAULT true,
  	"match_score" numeric,
  	"match_band" "enum_applications_match_band" DEFAULT 'pending',
  	"rating" "enum_applications_rating",
  	"assigned_to_id" integer,
  	"candidate_name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "resumes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"candidate_email" varchar,
  	"prefix" varchar DEFAULT 'resumes',
  	"_objectkey" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "vendors_regions" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_vendors_regions",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "vendors_certifications" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_vendors_certifications",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "vendors_references" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"client" varchar NOT NULL,
  	"project" varchar,
  	"year" numeric,
  	"contact" varchar
  );
  
  CREATE TABLE "vendors_documents" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"doc_type" varchar NOT NULL,
  	"file_id" integer NOT NULL,
  	"number" varchar,
  	"issue_date" timestamp(3) with time zone,
  	"expiry_date" timestamp(3) with time zone,
  	"review_status" "enum_vendors_documents_review_status" DEFAULT 'pending',
  	"review_note" varchar,
  	"reminder_sent_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "vendors_internal_notes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"note" varchar NOT NULL,
  	"author_id" integer,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "vendors_status_history" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"status" "enum_vendors_status_history_status",
  	"at" timestamp(3) with time zone,
  	"by" varchar,
  	"notified" boolean,
  	"note" varchar
  );
  
  CREATE TABLE "vendors_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "vendors" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"company_name" varchar NOT NULL,
  	"company_name_ar" varchar,
  	"vendor_type" "enum_vendors_vendor_type",
  	"year_established" numeric,
  	"employees" "enum_vendors_employees",
  	"country" varchar DEFAULT 'Saudi Arabia',
  	"city" varchar,
  	"national_address" varchar,
  	"address" varchar,
  	"website" varchar,
  	"company_phone" varchar,
  	"description" varchar,
  	"primary_contact_name" varchar,
  	"primary_contact_title" varchar,
  	"primary_contact_email" varchar,
  	"primary_contact_phone" varchar,
  	"sales_contact_name" varchar,
  	"sales_contact_title" varchar,
  	"sales_contact_email" varchar,
  	"sales_contact_phone" varchar,
  	"finance_contact_name" varchar,
  	"finance_contact_title" varchar,
  	"finance_contact_email" varchar,
  	"finance_contact_phone" varchar,
  	"cr_number" varchar,
  	"cr_expiry" timestamp(3) with time zone,
  	"vat_number" varchar,
  	"chamber_number" varchar,
  	"gosi_number" varchar,
  	"nitaqat" "enum_vendors_nitaqat",
  	"brands" varchar,
  	"turnover_band" "enum_vendors_turnover_band",
  	"payment_terms" "enum_vendors_payment_terms",
  	"bank_name" varchar,
  	"account_holder" varchar,
  	"iban" varchar,
  	"swift" varchar,
  	"currency" varchar DEFAULT 'SAR',
  	"accept_code_of_conduct" boolean,
  	"accept_hse" boolean,
  	"no_conflict_of_interest" boolean,
  	"conflict_details" varchar,
  	"signatory_name" varchar,
  	"signatory_position" varchar,
  	"signature" varchar,
  	"declared_at" timestamp(3) with time zone,
  	"declared_ip" varchar,
  	"status" "enum_vendors_status" DEFAULT 'draft',
  	"reference_number" varchar,
  	"vendor_code" varchar,
  	"submitted_at" timestamp(3) with time zone,
  	"approved_at" timestamp(3) with time zone,
  	"valid_until" timestamp(3) with time zone,
  	"assigned_to_id" integer,
  	"risk_rating" "enum_vendors_risk_rating",
  	"performance_score" numeric,
  	"completeness" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"_verified" boolean,
  	"_verificationtoken" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "vendors_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "vendors_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"divisions_id" integer
  );
  
  CREATE TABLE "vendor_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"owner_id" integer,
  	"doc_type" varchar,
  	"prefix" varchar DEFAULT 'vendor-documents',
  	"_objectkey" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "users_roles" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_users_roles",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"job_title" varchar,
  	"notifications_new_applications" boolean,
  	"notifications_new_vendors" boolean,
  	"notifications_form_submissions" boolean,
  	"notifications_weekly_digest" boolean,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "email_logs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"subject" varchar NOT NULL,
  	"to" varchar,
  	"cc" varchar,
  	"category" varchar,
  	"status" "enum_email_logs_status",
  	"message_id" varchar,
  	"error" varchar,
  	"related_collection" varchar,
  	"related_id" varchar,
  	"html" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "audit_logs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"summary" varchar,
  	"action" "enum_audit_logs_action",
  	"collection_slug" varchar,
  	"doc_id" varchar,
  	"user_name" varchar,
  	"changed_fields" varchar,
  	"ip" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "redirects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"from" varchar NOT NULL,
  	"to_type" "enum_redirects_to_type" DEFAULT 'reference',
  	"to_url" varchar,
  	"type" "enum_redirects_type" NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "redirects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"divisions_id" integer,
  	"projects_id" integer,
  	"news_id" integer,
  	"job_openings_id" integer
  );
  
  CREATE TABLE "forms_blocks_checkbox" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"required" boolean,
  	"default_value" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_checkbox_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_country" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_country_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_email" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_email_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_message" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_message_locales" (
  	"message" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_number" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"default_value" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_number_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_select_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_select_options_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_select" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"placeholder" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_select_locales" (
  	"label" varchar,
  	"default_value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_text_locales" (
  	"label" varchar,
  	"default_value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_textarea" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_textarea_locales" (
  	"label" varchar,
  	"default_value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_choices_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "forms_blocks_choices_options_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_choices" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"required" boolean,
  	"multiple" boolean DEFAULT true,
  	"source" "enum_forms_blocks_choices_source" DEFAULT 'divisions',
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_choices_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_file_upload" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"required" boolean,
  	"max_files" numeric DEFAULT 5,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_file_upload_locales" (
  	"label" varchar,
  	"hint" varchar DEFAULT 'PDF, Word, Excel, CSV or images · up to 15 MB each',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"confirmation_type" "enum_forms_confirmation_type" DEFAULT 'message',
  	"redirect_url" varchar,
  	"multi_step" boolean,
  	"notify_inbox" "enum_forms_notify_inbox" DEFAULT 'contact',
  	"extra_recipients" varchar,
  	"auto_reply_enabled" boolean DEFAULT true,
  	"auto_reply_subject" varchar DEFAULT 'We received your message',
  	"auto_reply_body" varchar DEFAULT 'Dear {{name}},
  
  Thank you for contacting {{company}}. An engineer from our team will reply within 24 hours.
  
  For urgent matters call +966 51 088 0876.',
  	"analytics_event" "enum_forms_analytics_event" DEFAULT 'form_submit',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "forms_locales" (
  	"submit_button_label" varchar,
  	"confirmation_message" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "form_submissions_submission_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"field" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "form_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer NOT NULL,
  	"turnstile_token" varchar,
  	"page_path" varchar,
  	"country" varchar,
  	"status" "enum_form_submissions_status" DEFAULT 'new',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "search" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"priority" numeric,
  	"url" varchar,
  	"excerpt" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "search_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "search_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"divisions_id" integer,
  	"projects_id" integer,
  	"news_id" integer
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_jobs_log" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"executed_at" timestamp(3) with time zone NOT NULL,
  	"completed_at" timestamp(3) with time zone NOT NULL,
  	"task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
  	"task_i_d" varchar NOT NULL,
  	"input" jsonb,
  	"output" jsonb,
  	"state" "enum_payload_jobs_log_state" NOT NULL,
  	"error" jsonb
  );
  
  CREATE TABLE "payload_jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"input" jsonb,
  	"completed_at" timestamp(3) with time zone,
  	"total_tried" numeric DEFAULT 0,
  	"has_error" boolean DEFAULT false,
  	"error" jsonb,
  	"task_slug" "enum_payload_jobs_task_slug",
  	"queue" varchar DEFAULT 'default',
  	"wait_until" timestamp(3) with time zone,
  	"processing" boolean DEFAULT false,
  	"meta" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_folders_folder_type" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_payload_folders_folder_type",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "payload_folders" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"folder_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"divisions_id" integer,
  	"projects_id" integer,
  	"news_id" integer,
  	"partners_id" integer,
  	"team_members_id" integer,
  	"documents_id" integer,
  	"reusable_blocks_id" integer,
  	"media_id" integer,
  	"form_files_id" integer,
  	"job_openings_id" integer,
  	"applications_id" integer,
  	"resumes_id" integer,
  	"vendors_id" integer,
  	"vendor_documents_id" integer,
  	"users_id" integer,
  	"email_logs_id" integer,
  	"audit_logs_id" integer,
  	"redirects_id" integer,
  	"forms_id" integer,
  	"form_submissions_id" integer,
  	"search_id" integer,
  	"payload_folders_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"vendors_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings_company_phones" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_company_phones_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_company_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_company_emails_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_social_profiles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_site_settings_social_profiles_platform" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"general_site_name" varchar DEFAULT 'Sahara Technical Contracting Co.' NOT NULL,
  	"general_short_name" varchar DEFAULT 'STCC',
  	"general_title_template" varchar DEFAULT '%s | STCC',
  	"general_logo_id" integer,
  	"general_logo_light_id" integer,
  	"general_og_image_id" integer,
  	"company_legal_name" varchar DEFAULT 'Sahara Technical Contracting Co.',
  	"company_postal_code" varchar DEFAULT '32236',
  	"company_whatsapp" varchar,
  	"company_map_url" varchar,
  	"company_latitude" numeric,
  	"company_longitude" numeric,
  	"company_founding_year" numeric,
  	"theme_accent" varchar DEFAULT '#F07A2B',
  	"theme_navy" varchar DEFAULT '#0B2545',
  	"theme_navy_deep" varchar DEFAULT '#071A33',
  	"languages_enable_arabic" boolean DEFAULT false,
  	"announcement_enabled" boolean,
  	"announcement_link_url" varchar,
  	"announcement_tone" "enum_site_settings_announcement_tone" DEFAULT 'accent',
  	"code_head" varchar,
  	"code_body_end" varchar,
  	"code_google_site_verification" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_locales" (
  	"general_tagline" varchar DEFAULT 'Seamless Integration, Unmatched Security',
  	"general_default_description" varchar,
  	"company_street" varchar,
  	"company_city" varchar DEFAULT 'Dammam',
  	"company_country" varchar DEFAULT 'Kingdom of Saudi Arabia',
  	"company_office_hours" varchar,
  	"announcement_text" varchar,
  	"announcement_link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "header_top_bar_extra_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_top_bar_extra_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar
  );
  
  CREATE TABLE "header_top_bar_extra_links_locales" (
  	"link_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "header_nav_items_children" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_nav_items_children_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar
  );
  
  CREATE TABLE "header_nav_items_children_locales" (
  	"link_label" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "header_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_nav_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"dropdown" "enum_header_nav_items_dropdown" DEFAULT 'none',
  	"active_on" varchar
  );
  
  CREATE TABLE "header_nav_items_locales" (
  	"link_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"top_bar_enabled" boolean DEFAULT true,
  	"top_bar_show_contacts" boolean DEFAULT true,
  	"top_bar_vendor_button_enabled" boolean DEFAULT true,
  	"top_bar_vendor_button_link_type" "enum_header_top_bar_vendor_button_link_type" DEFAULT 'reference',
  	"top_bar_vendor_button_link_new_tab" boolean,
  	"top_bar_vendor_button_link_url" varchar,
  	"cta_enabled" boolean DEFAULT true,
  	"cta_link_type" "enum_header_cta_link_type" DEFAULT 'reference',
  	"cta_link_new_tab" boolean,
  	"cta_link_url" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "header_locales" (
  	"top_bar_vendor_button_link_label" varchar,
  	"cta_link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "header_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"divisions_id" integer,
  	"projects_id" integer,
  	"job_openings_id" integer,
  	"news_id" integer
  );
  
  CREATE TABLE "footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_columns_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar
  );
  
  CREATE TABLE "footer_columns_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source" "enum_footer_columns_source" DEFAULT 'custom'
  );
  
  CREATE TABLE "footer_columns_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_bottom_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_bottom_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar
  );
  
  CREATE TABLE "footer_bottom_links_locales" (
  	"link_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_contact_column" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_locales" (
  	"about" varchar,
  	"wordmark" varchar DEFAULT 'SAHARA TECHNICAL',
  	"copyright" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "footer_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"divisions_id" integer,
  	"projects_id" integer,
  	"job_openings_id" integer,
  	"news_id" integer
  );
  
  CREATE TABLE "email_settings_routing_contact_recipients" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL
  );
  
  CREATE TABLE "email_settings_routing_quote_recipients" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL
  );
  
  CREATE TABLE "email_settings_routing_careers_recipients" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL
  );
  
  CREATE TABLE "email_settings_routing_vendor_recipients" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL
  );
  
  CREATE TABLE "email_settings_routing_fallback_recipients" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL
  );
  
  CREATE TABLE "email_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"smtp_enabled" boolean DEFAULT true,
  	"smtp_host" varchar,
  	"smtp_port" numeric DEFAULT 587,
  	"smtp_security" "enum_email_settings_smtp_security" DEFAULT 'starttls',
  	"smtp_username" varchar,
  	"smtp_password" varchar,
  	"smtp_from_name" varchar DEFAULT 'STCC',
  	"smtp_from_address" varchar,
  	"smtp_reply_to" varchar,
  	"branding_footer_text" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "integrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"cloudflare_zone_id" varchar,
  	"cloudflare_api_token" varchar,
  	"cloudflare_purge_on_publish" boolean DEFAULT true,
  	"cloudflare_turnstile_site_key" varchar,
  	"cloudflare_turnstile_secret_key" varchar,
  	"cloudflare_web_analytics_token" varchar,
  	"analytics_enabled" boolean DEFAULT true,
  	"analytics_retention_days" numeric DEFAULT 760,
  	"analytics_excluded_paths" varchar,
  	"analytics_ga4_id" varchar,
  	"analytics_gtm_id" varchar,
  	"ai_enabled" boolean DEFAULT false,
  	"ai_provider" "enum_integrations_ai_provider" DEFAULT 'anthropic',
  	"ai_model" varchar DEFAULT 'claude-sonnet-5-5',
  	"ai_api_key" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "careers_settings_stage_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"stage" "enum_careers_settings_stage_emails_stage" NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"subject" varchar NOT NULL,
  	"heading" varchar,
  	"body" varchar NOT NULL
  );
  
  CREATE TABLE "careers_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"application_received_enabled" boolean DEFAULT true,
  	"application_received_subject" varchar DEFAULT 'We received your application for {{jobTitle}}',
  	"application_received_heading" varchar DEFAULT 'Thank you, {{firstName}}',
  	"application_received_body" varchar DEFAULT 'We have received your application for the **{{jobTitle}}** position at {{company}}.
  
  Our recruitment team reviews every application carefully. If your profile matches the role, we will contact you to arrange the next steps.
  
  Your reference number is **{{reference}}**.',
  	"new_application_enabled" boolean DEFAULT true,
  	"new_application_subject" varchar DEFAULT 'New application · {{jobTitle}} · {{matchScore}}% match',
  	"new_application_heading" varchar DEFAULT '{{firstName}} {{lastName}} applied for {{jobTitle}}',
  	"new_application_body" varchar DEFAULT 'A new application has been scored against the job requirements.',
  	"notify_only_above" numeric DEFAULT 0,
  	"weights_skills" numeric DEFAULT 40,
  	"weights_experience" numeric DEFAULT 20,
  	"weights_relevance" numeric DEFAULT 12,
  	"weights_certifications" numeric DEFAULT 10,
  	"weights_education" numeric DEFAULT 8,
  	"weights_screening" numeric DEFAULT 10,
  	"weights_missing_must_have_penalty" numeric DEFAULT 12,
  	"weights_auto_reject_knockouts" boolean DEFAULT false,
  	"retention_months" numeric DEFAULT 24,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "careers_settings_locales" (
  	"consent_text" varchar DEFAULT 'I agree that STCC may store and process my personal data and CV for recruitment purposes, for up to 24 months.',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "vendor_settings_document_types_required_for" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_vendor_settings_document_types_required_for",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "vendor_settings_document_types" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"required" boolean DEFAULT true,
  	"requires_expiry" boolean,
  	"requires_number" boolean
  );
  
  CREATE TABLE "vendor_settings_document_types_locales" (
  	"label" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "vendor_settings_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "vendor_settings_categories_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "vendor_settings_status_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"status" "enum_vendor_settings_status_emails_status" NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"subject" varchar NOT NULL,
  	"heading" varchar,
  	"body" varchar NOT NULL
  );
  
  CREATE TABLE "vendor_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"expiry_reminder_enabled" boolean DEFAULT true,
  	"expiry_reminder_days_before" numeric DEFAULT 30,
  	"expiry_reminder_subject" varchar DEFAULT 'Action needed: documents expiring soon – {{companyName}}',
  	"expiry_reminder_body" varchar DEFAULT 'Dear {{contactName}},
  
  The documents listed below are expiring soon. To keep your approved vendor status active, please upload renewed copies in the vendor portal.
  
  [Open vendor portal]({{portalUrl}})',
  	"new_submission_subject" varchar DEFAULT 'New vendor registration · {{companyName}} ({{reference}})',
  	"new_submission_body" varchar DEFAULT '**{{companyName}}** has submitted a vendor registration for review.',
  	"reference_prefix" varchar DEFAULT 'VR',
  	"vendor_code_prefix" varchar DEFAULT 'STCC-V',
  	"approval_validity_months" numeric DEFAULT 24,
  	"code_of_conduct_id" integer,
  	"hse_policy_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "vendor_settings_locales" (
  	"intro_text" varchar,
  	"declaration_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload_jobs_stats" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"stats" jsonb,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "pages_hero_links" ADD CONSTRAINT "pages_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_hero_links_locales" ADD CONSTRAINT "pages_hero_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_hero_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_hero_panel_items" ADD CONSTRAINT "pages_hero_panel_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_hero_panel_items_locales" ADD CONSTRAINT "pages_hero_panel_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_hero_panel_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_hero_tiles" ADD CONSTRAINT "pages_hero_tiles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_hero_tiles_locales" ADD CONSTRAINT "pages_hero_tiles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_hero_tiles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_hero_stats" ADD CONSTRAINT "pages_hero_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_hero_stats_locales" ADD CONSTRAINT "pages_hero_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_hero_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_divisions_grid" ADD CONSTRAINT "pages_blocks_divisions_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_divisions_grid_locales" ADD CONSTRAINT "pages_blocks_divisions_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_divisions_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_steps_steps" ADD CONSTRAINT "pages_blocks_process_steps_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_steps_steps_locales" ADD CONSTRAINT "pages_blocks_process_steps_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_process_steps_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_steps" ADD CONSTRAINT "pages_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_steps_locales" ADD CONSTRAINT "pages_blocks_process_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_cards_cards_items" ADD CONSTRAINT "pages_blocks_feature_cards_cards_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_cards_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_cards_cards_items_locales" ADD CONSTRAINT "pages_blocks_feature_cards_cards_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_cards_cards_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_cards_cards" ADD CONSTRAINT "pages_blocks_feature_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_cards_cards_locales" ADD CONSTRAINT "pages_blocks_feature_cards_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_cards_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_cards" ADD CONSTRAINT "pages_blocks_feature_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_cards_locales" ADD CONSTRAINT "pages_blocks_feature_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_items" ADD CONSTRAINT "pages_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_items_locales" ADD CONSTRAINT "pages_blocks_stats_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats" ADD CONSTRAINT "pages_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_logos" ADD CONSTRAINT "pages_blocks_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_logos_locales" ADD CONSTRAINT "pages_blocks_logos_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_logos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_links" ADD CONSTRAINT "pages_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_links_locales" ADD CONSTRAINT "pages_blocks_cta_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_locales" ADD CONSTRAINT "pages_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content" ADD CONSTRAINT "pages_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_locales" ADD CONSTRAINT "pages_blocks_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_chips_items" ADD CONSTRAINT "pages_blocks_chips_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_chips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_chips_items_locales" ADD CONSTRAINT "pages_blocks_chips_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_chips_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_chips" ADD CONSTRAINT "pages_blocks_chips_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_chips_locales" ADD CONSTRAINT "pages_blocks_chips_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_chips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tabs_tabs_items" ADD CONSTRAINT "pages_blocks_tabs_tabs_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_tabs_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tabs_tabs_items_locales" ADD CONSTRAINT "pages_blocks_tabs_tabs_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_tabs_tabs_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tabs_tabs" ADD CONSTRAINT "pages_blocks_tabs_tabs_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_tabs_tabs" ADD CONSTRAINT "pages_blocks_tabs_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tabs_tabs_locales" ADD CONSTRAINT "pages_blocks_tabs_tabs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_tabs_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tabs" ADD CONSTRAINT "pages_blocks_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tabs_locales" ADD CONSTRAINT "pages_blocks_tabs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_comparison_rows" ADD CONSTRAINT "pages_blocks_comparison_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_comparison"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_comparison_rows_locales" ADD CONSTRAINT "pages_blocks_comparison_rows_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_comparison_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_comparison" ADD CONSTRAINT "pages_blocks_comparison_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_comparison_locales" ADD CONSTRAINT "pages_blocks_comparison_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_comparison"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_items" ADD CONSTRAINT "pages_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_items_locales" ADD CONSTRAINT "pages_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_locales" ADD CONSTRAINT "pages_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_downloads" ADD CONSTRAINT "pages_blocks_downloads_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_downloads_locales" ADD CONSTRAINT "pages_blocks_downloads_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_downloads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team" ADD CONSTRAINT "pages_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_locales" ADD CONSTRAINT "pages_blocks_team_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_block" ADD CONSTRAINT "pages_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_block" ADD CONSTRAINT "pages_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_block_locales" ADD CONSTRAINT "pages_blocks_media_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_media_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_text_links" ADD CONSTRAINT "pages_blocks_image_text_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_image_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_text_links_locales" ADD CONSTRAINT "pages_blocks_image_text_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_image_text_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_text" ADD CONSTRAINT "pages_blocks_image_text_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_text" ADD CONSTRAINT "pages_blocks_image_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_text_locales" ADD CONSTRAINT "pages_blocks_image_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_image_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_form_block" ADD CONSTRAINT "pages_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_form_block" ADD CONSTRAINT "pages_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_form_block_locales" ADD CONSTRAINT "pages_blocks_form_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_form_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_projects" ADD CONSTRAINT "pages_blocks_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_projects_locales" ADD CONSTRAINT "pages_blocks_projects_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_jobs" ADD CONSTRAINT "pages_blocks_jobs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_jobs_locales" ADD CONSTRAINT "pages_blocks_jobs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_list_panel_items" ADD CONSTRAINT "pages_blocks_list_panel_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_list_panel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_list_panel_items_locales" ADD CONSTRAINT "pages_blocks_list_panel_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_list_panel_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_list_panel" ADD CONSTRAINT "pages_blocks_list_panel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_list_panel_locales" ADD CONSTRAINT "pages_blocks_list_panel_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_list_panel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rfq_card" ADD CONSTRAINT "pages_blocks_rfq_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rfq_card_locales" ADD CONSTRAINT "pages_blocks_rfq_card_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_rfq_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_reusable" ADD CONSTRAINT "pages_blocks_reusable_section_id_reusable_blocks_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."reusable_blocks"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_reusable" ADD CONSTRAINT "pages_blocks_reusable_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_breadcrumbs" ADD CONSTRAINT "pages_breadcrumbs_doc_id_pages_id_fk" FOREIGN KEY ("doc_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_breadcrumbs" ADD CONSTRAINT "pages_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_divisions_fk" FOREIGN KEY ("divisions_id") REFERENCES "public"."divisions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_job_openings_fk" FOREIGN KEY ("job_openings_id") REFERENCES "public"."job_openings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_partners_fk" FOREIGN KEY ("partners_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_hero_links" ADD CONSTRAINT "_pages_v_version_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_hero_links_locales" ADD CONSTRAINT "_pages_v_version_hero_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_version_hero_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_hero_panel_items" ADD CONSTRAINT "_pages_v_version_hero_panel_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_hero_panel_items_locales" ADD CONSTRAINT "_pages_v_version_hero_panel_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_version_hero_panel_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_hero_tiles" ADD CONSTRAINT "_pages_v_version_hero_tiles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_hero_tiles_locales" ADD CONSTRAINT "_pages_v_version_hero_tiles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_version_hero_tiles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_hero_stats" ADD CONSTRAINT "_pages_v_version_hero_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_hero_stats_locales" ADD CONSTRAINT "_pages_v_version_hero_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_version_hero_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_divisions_grid" ADD CONSTRAINT "_pages_v_blocks_divisions_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_divisions_grid_locales" ADD CONSTRAINT "_pages_v_blocks_divisions_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_divisions_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_steps_steps" ADD CONSTRAINT "_pages_v_blocks_process_steps_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_steps_steps_locales" ADD CONSTRAINT "_pages_v_blocks_process_steps_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_process_steps_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_steps" ADD CONSTRAINT "_pages_v_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_steps_locales" ADD CONSTRAINT "_pages_v_blocks_process_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_cards_cards_items" ADD CONSTRAINT "_pages_v_blocks_feature_cards_cards_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature_cards_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_cards_cards_items_locales" ADD CONSTRAINT "_pages_v_blocks_feature_cards_cards_items_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature_cards_cards_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_cards_cards" ADD CONSTRAINT "_pages_v_blocks_feature_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_cards_cards_locales" ADD CONSTRAINT "_pages_v_blocks_feature_cards_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature_cards_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_cards" ADD CONSTRAINT "_pages_v_blocks_feature_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_cards_locales" ADD CONSTRAINT "_pages_v_blocks_feature_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_items" ADD CONSTRAINT "_pages_v_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_items_locales" ADD CONSTRAINT "_pages_v_blocks_stats_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stats_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats" ADD CONSTRAINT "_pages_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_logos" ADD CONSTRAINT "_pages_v_blocks_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_logos_locales" ADD CONSTRAINT "_pages_v_blocks_logos_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_logos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_links" ADD CONSTRAINT "_pages_v_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_links_locales" ADD CONSTRAINT "_pages_v_blocks_cta_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_locales" ADD CONSTRAINT "_pages_v_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content" ADD CONSTRAINT "_pages_v_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_locales" ADD CONSTRAINT "_pages_v_blocks_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_chips_items" ADD CONSTRAINT "_pages_v_blocks_chips_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_chips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_chips_items_locales" ADD CONSTRAINT "_pages_v_blocks_chips_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_chips_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_chips" ADD CONSTRAINT "_pages_v_blocks_chips_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_chips_locales" ADD CONSTRAINT "_pages_v_blocks_chips_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_chips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tabs_tabs_items" ADD CONSTRAINT "_pages_v_blocks_tabs_tabs_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_tabs_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tabs_tabs_items_locales" ADD CONSTRAINT "_pages_v_blocks_tabs_tabs_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_tabs_tabs_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tabs_tabs" ADD CONSTRAINT "_pages_v_blocks_tabs_tabs_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tabs_tabs" ADD CONSTRAINT "_pages_v_blocks_tabs_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tabs_tabs_locales" ADD CONSTRAINT "_pages_v_blocks_tabs_tabs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_tabs_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tabs" ADD CONSTRAINT "_pages_v_blocks_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tabs_locales" ADD CONSTRAINT "_pages_v_blocks_tabs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_comparison_rows" ADD CONSTRAINT "_pages_v_blocks_comparison_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_comparison"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_comparison_rows_locales" ADD CONSTRAINT "_pages_v_blocks_comparison_rows_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_comparison_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_comparison" ADD CONSTRAINT "_pages_v_blocks_comparison_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_comparison_locales" ADD CONSTRAINT "_pages_v_blocks_comparison_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_comparison"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_items" ADD CONSTRAINT "_pages_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_items_locales" ADD CONSTRAINT "_pages_v_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq" ADD CONSTRAINT "_pages_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_locales" ADD CONSTRAINT "_pages_v_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_downloads" ADD CONSTRAINT "_pages_v_blocks_downloads_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_downloads_locales" ADD CONSTRAINT "_pages_v_blocks_downloads_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_downloads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team" ADD CONSTRAINT "_pages_v_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_locales" ADD CONSTRAINT "_pages_v_blocks_team_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_block" ADD CONSTRAINT "_pages_v_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_block" ADD CONSTRAINT "_pages_v_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_block_locales" ADD CONSTRAINT "_pages_v_blocks_media_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_media_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_text_links" ADD CONSTRAINT "_pages_v_blocks_image_text_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_image_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_text_links_locales" ADD CONSTRAINT "_pages_v_blocks_image_text_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_image_text_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_text" ADD CONSTRAINT "_pages_v_blocks_image_text_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_text" ADD CONSTRAINT "_pages_v_blocks_image_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_text_locales" ADD CONSTRAINT "_pages_v_blocks_image_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_image_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_form_block" ADD CONSTRAINT "_pages_v_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_form_block" ADD CONSTRAINT "_pages_v_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_form_block_locales" ADD CONSTRAINT "_pages_v_blocks_form_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_form_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_projects" ADD CONSTRAINT "_pages_v_blocks_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_projects_locales" ADD CONSTRAINT "_pages_v_blocks_projects_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_jobs" ADD CONSTRAINT "_pages_v_blocks_jobs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_jobs_locales" ADD CONSTRAINT "_pages_v_blocks_jobs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_list_panel_items" ADD CONSTRAINT "_pages_v_blocks_list_panel_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_list_panel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_list_panel_items_locales" ADD CONSTRAINT "_pages_v_blocks_list_panel_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_list_panel_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_list_panel" ADD CONSTRAINT "_pages_v_blocks_list_panel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_list_panel_locales" ADD CONSTRAINT "_pages_v_blocks_list_panel_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_list_panel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rfq_card" ADD CONSTRAINT "_pages_v_blocks_rfq_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rfq_card_locales" ADD CONSTRAINT "_pages_v_blocks_rfq_card_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_rfq_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_reusable" ADD CONSTRAINT "_pages_v_blocks_reusable_section_id_reusable_blocks_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."reusable_blocks"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_reusable" ADD CONSTRAINT "_pages_v_blocks_reusable_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_breadcrumbs" ADD CONSTRAINT "_pages_v_version_breadcrumbs_doc_id_pages_id_fk" FOREIGN KEY ("doc_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_version_breadcrumbs" ADD CONSTRAINT "_pages_v_version_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_hero_media_id_media_id_fk" FOREIGN KEY ("version_hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_parent_id_pages_id_fk" FOREIGN KEY ("version_parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_divisions_fk" FOREIGN KEY ("divisions_id") REFERENCES "public"."divisions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_job_openings_fk" FOREIGN KEY ("job_openings_id") REFERENCES "public"."job_openings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_partners_fk" FOREIGN KEY ("partners_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_chips" ADD CONSTRAINT "divisions_chips_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_chips_locales" ADD CONSTRAINT "divisions_chips_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions_chips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_hero_links" ADD CONSTRAINT "divisions_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_hero_links_locales" ADD CONSTRAINT "divisions_hero_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions_hero_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_hero_panel_items" ADD CONSTRAINT "divisions_hero_panel_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_hero_panel_items_locales" ADD CONSTRAINT "divisions_hero_panel_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions_hero_panel_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_hero_tiles" ADD CONSTRAINT "divisions_hero_tiles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_hero_tiles_locales" ADD CONSTRAINT "divisions_hero_tiles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions_hero_tiles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_hero_stats" ADD CONSTRAINT "divisions_hero_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_hero_stats_locales" ADD CONSTRAINT "divisions_hero_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions_hero_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_divisions_grid" ADD CONSTRAINT "divisions_blocks_divisions_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_divisions_grid_locales" ADD CONSTRAINT "divisions_blocks_divisions_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions_blocks_divisions_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_process_steps_steps" ADD CONSTRAINT "divisions_blocks_process_steps_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_process_steps_steps_locales" ADD CONSTRAINT "divisions_blocks_process_steps_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions_blocks_process_steps_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_process_steps" ADD CONSTRAINT "divisions_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_process_steps_locales" ADD CONSTRAINT "divisions_blocks_process_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_feature_cards_cards_items" ADD CONSTRAINT "divisions_blocks_feature_cards_cards_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions_blocks_feature_cards_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_feature_cards_cards_items_locales" ADD CONSTRAINT "divisions_blocks_feature_cards_cards_items_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions_blocks_feature_cards_cards_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_feature_cards_cards" ADD CONSTRAINT "divisions_blocks_feature_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions_blocks_feature_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_feature_cards_cards_locales" ADD CONSTRAINT "divisions_blocks_feature_cards_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions_blocks_feature_cards_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_feature_cards" ADD CONSTRAINT "divisions_blocks_feature_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_feature_cards_locales" ADD CONSTRAINT "divisions_blocks_feature_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions_blocks_feature_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_stats_items" ADD CONSTRAINT "divisions_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_stats_items_locales" ADD CONSTRAINT "divisions_blocks_stats_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions_blocks_stats_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_stats" ADD CONSTRAINT "divisions_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_logos" ADD CONSTRAINT "divisions_blocks_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_logos_locales" ADD CONSTRAINT "divisions_blocks_logos_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions_blocks_logos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_cta_links" ADD CONSTRAINT "divisions_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_cta_links_locales" ADD CONSTRAINT "divisions_blocks_cta_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions_blocks_cta_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_cta" ADD CONSTRAINT "divisions_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_cta_locales" ADD CONSTRAINT "divisions_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_content" ADD CONSTRAINT "divisions_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_content_locales" ADD CONSTRAINT "divisions_blocks_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_chips_items" ADD CONSTRAINT "divisions_blocks_chips_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions_blocks_chips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_chips_items_locales" ADD CONSTRAINT "divisions_blocks_chips_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions_blocks_chips_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_chips" ADD CONSTRAINT "divisions_blocks_chips_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_chips_locales" ADD CONSTRAINT "divisions_blocks_chips_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions_blocks_chips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_tabs_tabs_items" ADD CONSTRAINT "divisions_blocks_tabs_tabs_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions_blocks_tabs_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_tabs_tabs_items_locales" ADD CONSTRAINT "divisions_blocks_tabs_tabs_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions_blocks_tabs_tabs_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_tabs_tabs" ADD CONSTRAINT "divisions_blocks_tabs_tabs_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "divisions_blocks_tabs_tabs" ADD CONSTRAINT "divisions_blocks_tabs_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions_blocks_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_tabs_tabs_locales" ADD CONSTRAINT "divisions_blocks_tabs_tabs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions_blocks_tabs_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_tabs" ADD CONSTRAINT "divisions_blocks_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_tabs_locales" ADD CONSTRAINT "divisions_blocks_tabs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions_blocks_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_comparison_rows" ADD CONSTRAINT "divisions_blocks_comparison_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions_blocks_comparison"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_comparison_rows_locales" ADD CONSTRAINT "divisions_blocks_comparison_rows_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions_blocks_comparison_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_comparison" ADD CONSTRAINT "divisions_blocks_comparison_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_comparison_locales" ADD CONSTRAINT "divisions_blocks_comparison_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions_blocks_comparison"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_faq_items" ADD CONSTRAINT "divisions_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_faq_items_locales" ADD CONSTRAINT "divisions_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_faq" ADD CONSTRAINT "divisions_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_faq_locales" ADD CONSTRAINT "divisions_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_downloads" ADD CONSTRAINT "divisions_blocks_downloads_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_downloads_locales" ADD CONSTRAINT "divisions_blocks_downloads_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions_blocks_downloads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_team" ADD CONSTRAINT "divisions_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_team_locales" ADD CONSTRAINT "divisions_blocks_team_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_media_block" ADD CONSTRAINT "divisions_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "divisions_blocks_media_block" ADD CONSTRAINT "divisions_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_media_block_locales" ADD CONSTRAINT "divisions_blocks_media_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions_blocks_media_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_image_text_links" ADD CONSTRAINT "divisions_blocks_image_text_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions_blocks_image_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_image_text_links_locales" ADD CONSTRAINT "divisions_blocks_image_text_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions_blocks_image_text_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_image_text" ADD CONSTRAINT "divisions_blocks_image_text_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "divisions_blocks_image_text" ADD CONSTRAINT "divisions_blocks_image_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_image_text_locales" ADD CONSTRAINT "divisions_blocks_image_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions_blocks_image_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_form_block" ADD CONSTRAINT "divisions_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "divisions_blocks_form_block" ADD CONSTRAINT "divisions_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_form_block_locales" ADD CONSTRAINT "divisions_blocks_form_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions_blocks_form_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_projects" ADD CONSTRAINT "divisions_blocks_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_projects_locales" ADD CONSTRAINT "divisions_blocks_projects_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions_blocks_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_jobs" ADD CONSTRAINT "divisions_blocks_jobs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_jobs_locales" ADD CONSTRAINT "divisions_blocks_jobs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions_blocks_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_list_panel_items" ADD CONSTRAINT "divisions_blocks_list_panel_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions_blocks_list_panel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_list_panel_items_locales" ADD CONSTRAINT "divisions_blocks_list_panel_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions_blocks_list_panel_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_list_panel" ADD CONSTRAINT "divisions_blocks_list_panel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_list_panel_locales" ADD CONSTRAINT "divisions_blocks_list_panel_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions_blocks_list_panel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_rfq_card" ADD CONSTRAINT "divisions_blocks_rfq_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_rfq_card_locales" ADD CONSTRAINT "divisions_blocks_rfq_card_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions_blocks_rfq_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_blocks_reusable" ADD CONSTRAINT "divisions_blocks_reusable_section_id_reusable_blocks_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."reusable_blocks"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "divisions_blocks_reusable" ADD CONSTRAINT "divisions_blocks_reusable_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions" ADD CONSTRAINT "divisions_card_image_id_media_id_fk" FOREIGN KEY ("card_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "divisions" ADD CONSTRAINT "divisions_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "divisions_locales" ADD CONSTRAINT "divisions_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "divisions_locales" ADD CONSTRAINT "divisions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."divisions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_rels" ADD CONSTRAINT "divisions_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."divisions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_rels" ADD CONSTRAINT "divisions_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_rels" ADD CONSTRAINT "divisions_rels_divisions_fk" FOREIGN KEY ("divisions_id") REFERENCES "public"."divisions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_rels" ADD CONSTRAINT "divisions_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_rels" ADD CONSTRAINT "divisions_rels_job_openings_fk" FOREIGN KEY ("job_openings_id") REFERENCES "public"."job_openings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_rels" ADD CONSTRAINT "divisions_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_rels" ADD CONSTRAINT "divisions_rels_partners_fk" FOREIGN KEY ("partners_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_rels" ADD CONSTRAINT "divisions_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "divisions_rels" ADD CONSTRAINT "divisions_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_version_chips" ADD CONSTRAINT "_divisions_v_version_chips_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_version_chips_locales" ADD CONSTRAINT "_divisions_v_version_chips_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v_version_chips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_version_hero_links" ADD CONSTRAINT "_divisions_v_version_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_version_hero_links_locales" ADD CONSTRAINT "_divisions_v_version_hero_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v_version_hero_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_version_hero_panel_items" ADD CONSTRAINT "_divisions_v_version_hero_panel_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_version_hero_panel_items_locales" ADD CONSTRAINT "_divisions_v_version_hero_panel_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v_version_hero_panel_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_version_hero_tiles" ADD CONSTRAINT "_divisions_v_version_hero_tiles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_version_hero_tiles_locales" ADD CONSTRAINT "_divisions_v_version_hero_tiles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v_version_hero_tiles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_version_hero_stats" ADD CONSTRAINT "_divisions_v_version_hero_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_version_hero_stats_locales" ADD CONSTRAINT "_divisions_v_version_hero_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v_version_hero_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_divisions_grid" ADD CONSTRAINT "_divisions_v_blocks_divisions_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_divisions_grid_locales" ADD CONSTRAINT "_divisions_v_blocks_divisions_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v_blocks_divisions_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_process_steps_steps" ADD CONSTRAINT "_divisions_v_blocks_process_steps_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_process_steps_steps_locales" ADD CONSTRAINT "_divisions_v_blocks_process_steps_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v_blocks_process_steps_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_process_steps" ADD CONSTRAINT "_divisions_v_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_process_steps_locales" ADD CONSTRAINT "_divisions_v_blocks_process_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_feature_cards_cards_items" ADD CONSTRAINT "_divisions_v_blocks_feature_cards_cards_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v_blocks_feature_cards_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_feature_cards_cards_items_locales" ADD CONSTRAINT "_divisions_v_blocks_feature_cards_cards_items_locales_par_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v_blocks_feature_cards_cards_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_feature_cards_cards" ADD CONSTRAINT "_divisions_v_blocks_feature_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v_blocks_feature_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_feature_cards_cards_locales" ADD CONSTRAINT "_divisions_v_blocks_feature_cards_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v_blocks_feature_cards_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_feature_cards" ADD CONSTRAINT "_divisions_v_blocks_feature_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_feature_cards_locales" ADD CONSTRAINT "_divisions_v_blocks_feature_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v_blocks_feature_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_stats_items" ADD CONSTRAINT "_divisions_v_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_stats_items_locales" ADD CONSTRAINT "_divisions_v_blocks_stats_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v_blocks_stats_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_stats" ADD CONSTRAINT "_divisions_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_logos" ADD CONSTRAINT "_divisions_v_blocks_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_logos_locales" ADD CONSTRAINT "_divisions_v_blocks_logos_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v_blocks_logos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_cta_links" ADD CONSTRAINT "_divisions_v_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_cta_links_locales" ADD CONSTRAINT "_divisions_v_blocks_cta_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v_blocks_cta_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_cta" ADD CONSTRAINT "_divisions_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_cta_locales" ADD CONSTRAINT "_divisions_v_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_content" ADD CONSTRAINT "_divisions_v_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_content_locales" ADD CONSTRAINT "_divisions_v_blocks_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_chips_items" ADD CONSTRAINT "_divisions_v_blocks_chips_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v_blocks_chips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_chips_items_locales" ADD CONSTRAINT "_divisions_v_blocks_chips_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v_blocks_chips_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_chips" ADD CONSTRAINT "_divisions_v_blocks_chips_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_chips_locales" ADD CONSTRAINT "_divisions_v_blocks_chips_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v_blocks_chips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_tabs_tabs_items" ADD CONSTRAINT "_divisions_v_blocks_tabs_tabs_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v_blocks_tabs_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_tabs_tabs_items_locales" ADD CONSTRAINT "_divisions_v_blocks_tabs_tabs_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v_blocks_tabs_tabs_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_tabs_tabs" ADD CONSTRAINT "_divisions_v_blocks_tabs_tabs_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_tabs_tabs" ADD CONSTRAINT "_divisions_v_blocks_tabs_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v_blocks_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_tabs_tabs_locales" ADD CONSTRAINT "_divisions_v_blocks_tabs_tabs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v_blocks_tabs_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_tabs" ADD CONSTRAINT "_divisions_v_blocks_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_tabs_locales" ADD CONSTRAINT "_divisions_v_blocks_tabs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v_blocks_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_comparison_rows" ADD CONSTRAINT "_divisions_v_blocks_comparison_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v_blocks_comparison"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_comparison_rows_locales" ADD CONSTRAINT "_divisions_v_blocks_comparison_rows_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v_blocks_comparison_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_comparison" ADD CONSTRAINT "_divisions_v_blocks_comparison_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_comparison_locales" ADD CONSTRAINT "_divisions_v_blocks_comparison_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v_blocks_comparison"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_faq_items" ADD CONSTRAINT "_divisions_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_faq_items_locales" ADD CONSTRAINT "_divisions_v_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_faq" ADD CONSTRAINT "_divisions_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_faq_locales" ADD CONSTRAINT "_divisions_v_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_downloads" ADD CONSTRAINT "_divisions_v_blocks_downloads_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_downloads_locales" ADD CONSTRAINT "_divisions_v_blocks_downloads_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v_blocks_downloads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_team" ADD CONSTRAINT "_divisions_v_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_team_locales" ADD CONSTRAINT "_divisions_v_blocks_team_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_media_block" ADD CONSTRAINT "_divisions_v_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_media_block" ADD CONSTRAINT "_divisions_v_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_media_block_locales" ADD CONSTRAINT "_divisions_v_blocks_media_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v_blocks_media_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_image_text_links" ADD CONSTRAINT "_divisions_v_blocks_image_text_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v_blocks_image_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_image_text_links_locales" ADD CONSTRAINT "_divisions_v_blocks_image_text_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v_blocks_image_text_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_image_text" ADD CONSTRAINT "_divisions_v_blocks_image_text_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_image_text" ADD CONSTRAINT "_divisions_v_blocks_image_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_image_text_locales" ADD CONSTRAINT "_divisions_v_blocks_image_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v_blocks_image_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_form_block" ADD CONSTRAINT "_divisions_v_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_form_block" ADD CONSTRAINT "_divisions_v_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_form_block_locales" ADD CONSTRAINT "_divisions_v_blocks_form_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v_blocks_form_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_projects" ADD CONSTRAINT "_divisions_v_blocks_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_projects_locales" ADD CONSTRAINT "_divisions_v_blocks_projects_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v_blocks_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_jobs" ADD CONSTRAINT "_divisions_v_blocks_jobs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_jobs_locales" ADD CONSTRAINT "_divisions_v_blocks_jobs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v_blocks_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_list_panel_items" ADD CONSTRAINT "_divisions_v_blocks_list_panel_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v_blocks_list_panel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_list_panel_items_locales" ADD CONSTRAINT "_divisions_v_blocks_list_panel_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v_blocks_list_panel_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_list_panel" ADD CONSTRAINT "_divisions_v_blocks_list_panel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_list_panel_locales" ADD CONSTRAINT "_divisions_v_blocks_list_panel_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v_blocks_list_panel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_rfq_card" ADD CONSTRAINT "_divisions_v_blocks_rfq_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_rfq_card_locales" ADD CONSTRAINT "_divisions_v_blocks_rfq_card_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v_blocks_rfq_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_reusable" ADD CONSTRAINT "_divisions_v_blocks_reusable_section_id_reusable_blocks_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."reusable_blocks"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_divisions_v_blocks_reusable" ADD CONSTRAINT "_divisions_v_blocks_reusable_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v" ADD CONSTRAINT "_divisions_v_parent_id_divisions_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."divisions"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_divisions_v" ADD CONSTRAINT "_divisions_v_version_card_image_id_media_id_fk" FOREIGN KEY ("version_card_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_divisions_v" ADD CONSTRAINT "_divisions_v_version_hero_media_id_media_id_fk" FOREIGN KEY ("version_hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_divisions_v_locales" ADD CONSTRAINT "_divisions_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_divisions_v_locales" ADD CONSTRAINT "_divisions_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_divisions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_rels" ADD CONSTRAINT "_divisions_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_divisions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_rels" ADD CONSTRAINT "_divisions_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_rels" ADD CONSTRAINT "_divisions_v_rels_divisions_fk" FOREIGN KEY ("divisions_id") REFERENCES "public"."divisions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_rels" ADD CONSTRAINT "_divisions_v_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_rels" ADD CONSTRAINT "_divisions_v_rels_job_openings_fk" FOREIGN KEY ("job_openings_id") REFERENCES "public"."job_openings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_rels" ADD CONSTRAINT "_divisions_v_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_rels" ADD CONSTRAINT "_divisions_v_rels_partners_fk" FOREIGN KEY ("partners_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_rels" ADD CONSTRAINT "_divisions_v_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_divisions_v_rels" ADD CONSTRAINT "_divisions_v_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_metrics" ADD CONSTRAINT "projects_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_metrics_locales" ADD CONSTRAINT "projects_metrics_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_metrics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_locales" ADD CONSTRAINT "projects_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_locales" ADD CONSTRAINT "projects_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_divisions_fk" FOREIGN KEY ("divisions_id") REFERENCES "public"."divisions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_metrics" ADD CONSTRAINT "_projects_v_version_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_metrics_locales" ADD CONSTRAINT "_projects_v_version_metrics_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_version_metrics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_parent_id_projects_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_locales" ADD CONSTRAINT "_projects_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_locales" ADD CONSTRAINT "_projects_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_divisions_fk" FOREIGN KEY ("divisions_id") REFERENCES "public"."divisions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news" ADD CONSTRAINT "news_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news" ADD CONSTRAINT "news_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news_locales" ADD CONSTRAINT "news_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news_locales" ADD CONSTRAINT "news_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_parent_id_news_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."news"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_version_author_id_users_id_fk" FOREIGN KEY ("version_author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v_locales" ADD CONSTRAINT "_news_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v_locales" ADD CONSTRAINT "_news_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "partners" ADD CONSTRAINT "partners_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "team_members" ADD CONSTRAINT "team_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "team_members_locales" ADD CONSTRAINT "team_members_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "documents_locales" ADD CONSTRAINT "documents_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_divisions_grid" ADD CONSTRAINT "reusable_blocks_blocks_divisions_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_divisions_grid_locales" ADD CONSTRAINT "reusable_blocks_blocks_divisions_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks_blocks_divisions_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_process_steps_steps" ADD CONSTRAINT "reusable_blocks_blocks_process_steps_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_process_steps_steps_locales" ADD CONSTRAINT "reusable_blocks_blocks_process_steps_steps_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks_blocks_process_steps_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_process_steps" ADD CONSTRAINT "reusable_blocks_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_process_steps_locales" ADD CONSTRAINT "reusable_blocks_blocks_process_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_feature_cards_cards_items" ADD CONSTRAINT "reusable_blocks_blocks_feature_cards_cards_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks_blocks_feature_cards_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_feature_cards_cards_items_locales" ADD CONSTRAINT "reusable_blocks_blocks_feature_cards_cards_items_locales__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks_blocks_feature_cards_cards_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_feature_cards_cards" ADD CONSTRAINT "reusable_blocks_blocks_feature_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks_blocks_feature_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_feature_cards_cards_locales" ADD CONSTRAINT "reusable_blocks_blocks_feature_cards_cards_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks_blocks_feature_cards_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_feature_cards" ADD CONSTRAINT "reusable_blocks_blocks_feature_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_feature_cards_locales" ADD CONSTRAINT "reusable_blocks_blocks_feature_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks_blocks_feature_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_stats_items" ADD CONSTRAINT "reusable_blocks_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_stats_items_locales" ADD CONSTRAINT "reusable_blocks_blocks_stats_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks_blocks_stats_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_stats" ADD CONSTRAINT "reusable_blocks_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_logos" ADD CONSTRAINT "reusable_blocks_blocks_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_logos_locales" ADD CONSTRAINT "reusable_blocks_blocks_logos_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks_blocks_logos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_cta_links" ADD CONSTRAINT "reusable_blocks_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_cta_links_locales" ADD CONSTRAINT "reusable_blocks_blocks_cta_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks_blocks_cta_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_cta" ADD CONSTRAINT "reusable_blocks_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_cta_locales" ADD CONSTRAINT "reusable_blocks_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_content" ADD CONSTRAINT "reusable_blocks_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_content_locales" ADD CONSTRAINT "reusable_blocks_blocks_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_chips_items" ADD CONSTRAINT "reusable_blocks_blocks_chips_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks_blocks_chips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_chips_items_locales" ADD CONSTRAINT "reusable_blocks_blocks_chips_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks_blocks_chips_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_chips" ADD CONSTRAINT "reusable_blocks_blocks_chips_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_chips_locales" ADD CONSTRAINT "reusable_blocks_blocks_chips_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks_blocks_chips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_tabs_tabs_items" ADD CONSTRAINT "reusable_blocks_blocks_tabs_tabs_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks_blocks_tabs_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_tabs_tabs_items_locales" ADD CONSTRAINT "reusable_blocks_blocks_tabs_tabs_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks_blocks_tabs_tabs_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_tabs_tabs" ADD CONSTRAINT "reusable_blocks_blocks_tabs_tabs_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_tabs_tabs" ADD CONSTRAINT "reusable_blocks_blocks_tabs_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks_blocks_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_tabs_tabs_locales" ADD CONSTRAINT "reusable_blocks_blocks_tabs_tabs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks_blocks_tabs_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_tabs" ADD CONSTRAINT "reusable_blocks_blocks_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_tabs_locales" ADD CONSTRAINT "reusable_blocks_blocks_tabs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks_blocks_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_comparison_rows" ADD CONSTRAINT "reusable_blocks_blocks_comparison_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks_blocks_comparison"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_comparison_rows_locales" ADD CONSTRAINT "reusable_blocks_blocks_comparison_rows_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks_blocks_comparison_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_comparison" ADD CONSTRAINT "reusable_blocks_blocks_comparison_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_comparison_locales" ADD CONSTRAINT "reusable_blocks_blocks_comparison_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks_blocks_comparison"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_faq_items" ADD CONSTRAINT "reusable_blocks_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_faq_items_locales" ADD CONSTRAINT "reusable_blocks_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_faq" ADD CONSTRAINT "reusable_blocks_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_faq_locales" ADD CONSTRAINT "reusable_blocks_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_downloads" ADD CONSTRAINT "reusable_blocks_blocks_downloads_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_downloads_locales" ADD CONSTRAINT "reusable_blocks_blocks_downloads_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks_blocks_downloads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_team" ADD CONSTRAINT "reusable_blocks_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_team_locales" ADD CONSTRAINT "reusable_blocks_blocks_team_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_media_block" ADD CONSTRAINT "reusable_blocks_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_media_block" ADD CONSTRAINT "reusable_blocks_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_media_block_locales" ADD CONSTRAINT "reusable_blocks_blocks_media_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks_blocks_media_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_image_text_links" ADD CONSTRAINT "reusable_blocks_blocks_image_text_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks_blocks_image_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_image_text_links_locales" ADD CONSTRAINT "reusable_blocks_blocks_image_text_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks_blocks_image_text_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_image_text" ADD CONSTRAINT "reusable_blocks_blocks_image_text_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_image_text" ADD CONSTRAINT "reusable_blocks_blocks_image_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_image_text_locales" ADD CONSTRAINT "reusable_blocks_blocks_image_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks_blocks_image_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_form_block" ADD CONSTRAINT "reusable_blocks_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_form_block" ADD CONSTRAINT "reusable_blocks_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_form_block_locales" ADD CONSTRAINT "reusable_blocks_blocks_form_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks_blocks_form_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_projects" ADD CONSTRAINT "reusable_blocks_blocks_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_projects_locales" ADD CONSTRAINT "reusable_blocks_blocks_projects_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks_blocks_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_jobs" ADD CONSTRAINT "reusable_blocks_blocks_jobs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_jobs_locales" ADD CONSTRAINT "reusable_blocks_blocks_jobs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks_blocks_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_list_panel_items" ADD CONSTRAINT "reusable_blocks_blocks_list_panel_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks_blocks_list_panel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_list_panel_items_locales" ADD CONSTRAINT "reusable_blocks_blocks_list_panel_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks_blocks_list_panel_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_list_panel" ADD CONSTRAINT "reusable_blocks_blocks_list_panel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_list_panel_locales" ADD CONSTRAINT "reusable_blocks_blocks_list_panel_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks_blocks_list_panel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_rfq_card" ADD CONSTRAINT "reusable_blocks_blocks_rfq_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_blocks_rfq_card_locales" ADD CONSTRAINT "reusable_blocks_blocks_rfq_card_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_blocks_blocks_rfq_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_rels" ADD CONSTRAINT "reusable_blocks_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."reusable_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_rels" ADD CONSTRAINT "reusable_blocks_rels_divisions_fk" FOREIGN KEY ("divisions_id") REFERENCES "public"."divisions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_rels" ADD CONSTRAINT "reusable_blocks_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_rels" ADD CONSTRAINT "reusable_blocks_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_rels" ADD CONSTRAINT "reusable_blocks_rels_job_openings_fk" FOREIGN KEY ("job_openings_id") REFERENCES "public"."job_openings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_rels" ADD CONSTRAINT "reusable_blocks_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_rels" ADD CONSTRAINT "reusable_blocks_rels_partners_fk" FOREIGN KEY ("partners_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_rels" ADD CONSTRAINT "reusable_blocks_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_blocks_rels" ADD CONSTRAINT "reusable_blocks_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media" ADD CONSTRAINT "media_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "job_openings_responsibilities" ADD CONSTRAINT "job_openings_responsibilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."job_openings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "job_openings_responsibilities_locales" ADD CONSTRAINT "job_openings_responsibilities_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."job_openings_responsibilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "job_openings_requirements" ADD CONSTRAINT "job_openings_requirements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."job_openings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "job_openings_requirements_locales" ADD CONSTRAINT "job_openings_requirements_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."job_openings_requirements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "job_openings_benefits" ADD CONSTRAINT "job_openings_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."job_openings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "job_openings_benefits_locales" ADD CONSTRAINT "job_openings_benefits_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."job_openings_benefits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "job_openings_skills" ADD CONSTRAINT "job_openings_skills_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."job_openings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "job_openings_certifications" ADD CONSTRAINT "job_openings_certifications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."job_openings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "job_openings_screening_questions" ADD CONSTRAINT "job_openings_screening_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."job_openings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "job_openings_screening_questions_locales" ADD CONSTRAINT "job_openings_screening_questions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."job_openings_screening_questions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "job_openings_notify_recipients" ADD CONSTRAINT "job_openings_notify_recipients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."job_openings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "job_openings" ADD CONSTRAINT "job_openings_division_id_divisions_id_fk" FOREIGN KEY ("division_id") REFERENCES "public"."divisions"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "job_openings" ADD CONSTRAINT "job_openings_hiring_manager_id_users_id_fk" FOREIGN KEY ("hiring_manager_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "job_openings_locales" ADD CONSTRAINT "job_openings_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "job_openings_locales" ADD CONSTRAINT "job_openings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."job_openings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "applications_screening_answers" ADD CONSTRAINT "applications_screening_answers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."applications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "applications_notes" ADD CONSTRAINT "applications_notes_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "applications_notes" ADD CONSTRAINT "applications_notes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."applications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "applications_activity" ADD CONSTRAINT "applications_activity_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."applications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "applications_tags" ADD CONSTRAINT "applications_tags_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."applications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "applications" ADD CONSTRAINT "applications_resume_id_resumes_id_fk" FOREIGN KEY ("resume_id") REFERENCES "public"."resumes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "applications" ADD CONSTRAINT "applications_job_id_job_openings_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."job_openings"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "applications" ADD CONSTRAINT "applications_assigned_to_id_users_id_fk" FOREIGN KEY ("assigned_to_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "vendors_regions" ADD CONSTRAINT "vendors_regions_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."vendors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vendors_certifications" ADD CONSTRAINT "vendors_certifications_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."vendors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vendors_references" ADD CONSTRAINT "vendors_references_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vendors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vendors_documents" ADD CONSTRAINT "vendors_documents_file_id_vendor_documents_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."vendor_documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "vendors_documents" ADD CONSTRAINT "vendors_documents_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vendors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vendors_internal_notes" ADD CONSTRAINT "vendors_internal_notes_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "vendors_internal_notes" ADD CONSTRAINT "vendors_internal_notes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vendors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vendors_status_history" ADD CONSTRAINT "vendors_status_history_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vendors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vendors_sessions" ADD CONSTRAINT "vendors_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vendors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vendors" ADD CONSTRAINT "vendors_assigned_to_id_users_id_fk" FOREIGN KEY ("assigned_to_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "vendors_texts" ADD CONSTRAINT "vendors_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."vendors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vendors_rels" ADD CONSTRAINT "vendors_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."vendors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vendors_rels" ADD CONSTRAINT "vendors_rels_divisions_fk" FOREIGN KEY ("divisions_id") REFERENCES "public"."divisions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vendor_documents" ADD CONSTRAINT "vendor_documents_owner_id_vendors_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."vendors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_divisions_fk" FOREIGN KEY ("divisions_id") REFERENCES "public"."divisions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_job_openings_fk" FOREIGN KEY ("job_openings_id") REFERENCES "public"."job_openings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_checkbox" ADD CONSTRAINT "forms_blocks_checkbox_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_checkbox_locales" ADD CONSTRAINT "forms_blocks_checkbox_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_checkbox"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_country" ADD CONSTRAINT "forms_blocks_country_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_country_locales" ADD CONSTRAINT "forms_blocks_country_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_country"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_email" ADD CONSTRAINT "forms_blocks_email_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_email_locales" ADD CONSTRAINT "forms_blocks_email_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_email"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_message" ADD CONSTRAINT "forms_blocks_message_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_message_locales" ADD CONSTRAINT "forms_blocks_message_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_message"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_number" ADD CONSTRAINT "forms_blocks_number_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_number_locales" ADD CONSTRAINT "forms_blocks_number_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_number"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select_options" ADD CONSTRAINT "forms_blocks_select_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select_options_locales" ADD CONSTRAINT "forms_blocks_select_options_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select_options"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select" ADD CONSTRAINT "forms_blocks_select_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select_locales" ADD CONSTRAINT "forms_blocks_select_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_text" ADD CONSTRAINT "forms_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_text_locales" ADD CONSTRAINT "forms_blocks_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_textarea" ADD CONSTRAINT "forms_blocks_textarea_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_textarea_locales" ADD CONSTRAINT "forms_blocks_textarea_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_textarea"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_choices_options" ADD CONSTRAINT "forms_blocks_choices_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_choices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_choices_options_locales" ADD CONSTRAINT "forms_blocks_choices_options_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_choices_options"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_choices" ADD CONSTRAINT "forms_blocks_choices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_choices_locales" ADD CONSTRAINT "forms_blocks_choices_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_choices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_file_upload" ADD CONSTRAINT "forms_blocks_file_upload_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_file_upload_locales" ADD CONSTRAINT "forms_blocks_file_upload_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_file_upload"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_locales" ADD CONSTRAINT "forms_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions_submission_data" ADD CONSTRAINT "form_submissions_submission_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "search_locales" ADD CONSTRAINT "search_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_divisions_fk" FOREIGN KEY ("divisions_id") REFERENCES "public"."divisions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_folders_folder_type" ADD CONSTRAINT "payload_folders_folder_type_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_folders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_folders" ADD CONSTRAINT "payload_folders_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_divisions_fk" FOREIGN KEY ("divisions_id") REFERENCES "public"."divisions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_partners_fk" FOREIGN KEY ("partners_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_reusable_blocks_fk" FOREIGN KEY ("reusable_blocks_id") REFERENCES "public"."reusable_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_files_fk" FOREIGN KEY ("form_files_id") REFERENCES "public"."form_files"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_job_openings_fk" FOREIGN KEY ("job_openings_id") REFERENCES "public"."job_openings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_applications_fk" FOREIGN KEY ("applications_id") REFERENCES "public"."applications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_resumes_fk" FOREIGN KEY ("resumes_id") REFERENCES "public"."resumes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_vendors_fk" FOREIGN KEY ("vendors_id") REFERENCES "public"."vendors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_vendor_documents_fk" FOREIGN KEY ("vendor_documents_id") REFERENCES "public"."vendor_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_email_logs_fk" FOREIGN KEY ("email_logs_id") REFERENCES "public"."email_logs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_audit_logs_fk" FOREIGN KEY ("audit_logs_id") REFERENCES "public"."audit_logs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_forms_fk" FOREIGN KEY ("forms_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_submissions_fk" FOREIGN KEY ("form_submissions_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_search_fk" FOREIGN KEY ("search_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_folders_fk" FOREIGN KEY ("payload_folders_id") REFERENCES "public"."payload_folders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_vendors_fk" FOREIGN KEY ("vendors_id") REFERENCES "public"."vendors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_company_phones" ADD CONSTRAINT "site_settings_company_phones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_company_phones_locales" ADD CONSTRAINT "site_settings_company_phones_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings_company_phones"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_company_emails" ADD CONSTRAINT "site_settings_company_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_company_emails_locales" ADD CONSTRAINT "site_settings_company_emails_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings_company_emails"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_social_profiles" ADD CONSTRAINT "site_settings_social_profiles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_general_logo_id_media_id_fk" FOREIGN KEY ("general_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_general_logo_light_id_media_id_fk" FOREIGN KEY ("general_logo_light_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_general_og_image_id_media_id_fk" FOREIGN KEY ("general_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_top_bar_extra_links" ADD CONSTRAINT "header_top_bar_extra_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_top_bar_extra_links_locales" ADD CONSTRAINT "header_top_bar_extra_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_top_bar_extra_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_children" ADD CONSTRAINT "header_nav_items_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_children_locales" ADD CONSTRAINT "header_nav_items_children_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items_children"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_locales" ADD CONSTRAINT "header_nav_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_locales" ADD CONSTRAINT "header_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_divisions_fk" FOREIGN KEY ("divisions_id") REFERENCES "public"."divisions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_job_openings_fk" FOREIGN KEY ("job_openings_id") REFERENCES "public"."job_openings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_links" ADD CONSTRAINT "footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_links_locales" ADD CONSTRAINT "footer_columns_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns" ADD CONSTRAINT "footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_locales" ADD CONSTRAINT "footer_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_bottom_links" ADD CONSTRAINT "footer_bottom_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_bottom_links_locales" ADD CONSTRAINT "footer_bottom_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_bottom_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_locales" ADD CONSTRAINT "footer_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_divisions_fk" FOREIGN KEY ("divisions_id") REFERENCES "public"."divisions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_job_openings_fk" FOREIGN KEY ("job_openings_id") REFERENCES "public"."job_openings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "email_settings_routing_contact_recipients" ADD CONSTRAINT "email_settings_routing_contact_recipients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."email_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "email_settings_routing_quote_recipients" ADD CONSTRAINT "email_settings_routing_quote_recipients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."email_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "email_settings_routing_careers_recipients" ADD CONSTRAINT "email_settings_routing_careers_recipients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."email_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "email_settings_routing_vendor_recipients" ADD CONSTRAINT "email_settings_routing_vendor_recipients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."email_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "email_settings_routing_fallback_recipients" ADD CONSTRAINT "email_settings_routing_fallback_recipients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."email_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "careers_settings_stage_emails" ADD CONSTRAINT "careers_settings_stage_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."careers_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "careers_settings_locales" ADD CONSTRAINT "careers_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."careers_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vendor_settings_document_types_required_for" ADD CONSTRAINT "vendor_settings_document_types_required_for_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."vendor_settings_document_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vendor_settings_document_types" ADD CONSTRAINT "vendor_settings_document_types_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vendor_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vendor_settings_document_types_locales" ADD CONSTRAINT "vendor_settings_document_types_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vendor_settings_document_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vendor_settings_categories" ADD CONSTRAINT "vendor_settings_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vendor_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vendor_settings_categories_locales" ADD CONSTRAINT "vendor_settings_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vendor_settings_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vendor_settings_status_emails" ADD CONSTRAINT "vendor_settings_status_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vendor_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vendor_settings" ADD CONSTRAINT "vendor_settings_code_of_conduct_id_documents_id_fk" FOREIGN KEY ("code_of_conduct_id") REFERENCES "public"."documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "vendor_settings" ADD CONSTRAINT "vendor_settings_hse_policy_id_documents_id_fk" FOREIGN KEY ("hse_policy_id") REFERENCES "public"."documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "vendor_settings_locales" ADD CONSTRAINT "vendor_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vendor_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_hero_links_order_idx" ON "pages_hero_links" USING btree ("_order");
  CREATE INDEX "pages_hero_links_parent_id_idx" ON "pages_hero_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_hero_links_locales_locale_parent_id_unique" ON "pages_hero_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_hero_links_locales_parent_id_idx" ON "pages_hero_links_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_hero_panel_items_order_idx" ON "pages_hero_panel_items" USING btree ("_order");
  CREATE INDEX "pages_hero_panel_items_parent_id_idx" ON "pages_hero_panel_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_hero_panel_items_locales_locale_parent_id_unique" ON "pages_hero_panel_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_hero_panel_items_locales_parent_id_idx" ON "pages_hero_panel_items_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_hero_tiles_order_idx" ON "pages_hero_tiles" USING btree ("_order");
  CREATE INDEX "pages_hero_tiles_parent_id_idx" ON "pages_hero_tiles" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_hero_tiles_locales_locale_parent_id_unique" ON "pages_hero_tiles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_hero_tiles_locales_parent_id_idx" ON "pages_hero_tiles_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_hero_stats_order_idx" ON "pages_hero_stats" USING btree ("_order");
  CREATE INDEX "pages_hero_stats_parent_id_idx" ON "pages_hero_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_hero_stats_locales_locale_parent_id_unique" ON "pages_hero_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_hero_stats_locales_parent_id_idx" ON "pages_hero_stats_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_divisions_grid_order_idx" ON "pages_blocks_divisions_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_divisions_grid_parent_id_idx" ON "pages_blocks_divisions_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_divisions_grid_path_idx" ON "pages_blocks_divisions_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_divisions_grid_locales_locale_parent_id_unique" ON "pages_blocks_divisions_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_divisions_grid_locales_parent_id_idx" ON "pages_blocks_divisions_grid_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_process_steps_steps_order_idx" ON "pages_blocks_process_steps_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_process_steps_steps_parent_id_idx" ON "pages_blocks_process_steps_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_process_steps_steps_locales_locale_parent_id_un" ON "pages_blocks_process_steps_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_process_steps_steps_locales_parent_id_idx" ON "pages_blocks_process_steps_steps_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_process_steps_order_idx" ON "pages_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_process_steps_parent_id_idx" ON "pages_blocks_process_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_process_steps_path_idx" ON "pages_blocks_process_steps" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_process_steps_locales_locale_parent_id_unique" ON "pages_blocks_process_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_process_steps_locales_parent_id_idx" ON "pages_blocks_process_steps_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_cards_cards_items_order_idx" ON "pages_blocks_feature_cards_cards_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_cards_cards_items_parent_id_idx" ON "pages_blocks_feature_cards_cards_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_feature_cards_cards_items_locales_locale_parent" ON "pages_blocks_feature_cards_cards_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_feature_cards_cards_items_locales_parent_id_idx" ON "pages_blocks_feature_cards_cards_items_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_cards_cards_order_idx" ON "pages_blocks_feature_cards_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_cards_cards_parent_id_idx" ON "pages_blocks_feature_cards_cards" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_feature_cards_cards_locales_locale_parent_id_un" ON "pages_blocks_feature_cards_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_feature_cards_cards_locales_parent_id_idx" ON "pages_blocks_feature_cards_cards_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_cards_order_idx" ON "pages_blocks_feature_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_cards_parent_id_idx" ON "pages_blocks_feature_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_cards_path_idx" ON "pages_blocks_feature_cards" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_feature_cards_locales_locale_parent_id_unique" ON "pages_blocks_feature_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_feature_cards_locales_parent_id_idx" ON "pages_blocks_feature_cards_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_items_order_idx" ON "pages_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_items_parent_id_idx" ON "pages_blocks_stats_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_stats_items_locales_locale_parent_id_unique" ON "pages_blocks_stats_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_stats_items_locales_parent_id_idx" ON "pages_blocks_stats_items_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_order_idx" ON "pages_blocks_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_parent_id_idx" ON "pages_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_path_idx" ON "pages_blocks_stats" USING btree ("_path");
  CREATE INDEX "pages_blocks_logos_order_idx" ON "pages_blocks_logos" USING btree ("_order");
  CREATE INDEX "pages_blocks_logos_parent_id_idx" ON "pages_blocks_logos" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_logos_path_idx" ON "pages_blocks_logos" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_logos_locales_locale_parent_id_unique" ON "pages_blocks_logos_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_logos_locales_parent_id_idx" ON "pages_blocks_logos_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_links_order_idx" ON "pages_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_links_parent_id_idx" ON "pages_blocks_cta_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_cta_links_locales_locale_parent_id_unique" ON "pages_blocks_cta_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_cta_links_locales_parent_id_idx" ON "pages_blocks_cta_links_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_order_idx" ON "pages_blocks_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_parent_id_idx" ON "pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_path_idx" ON "pages_blocks_cta" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_cta_locales_locale_parent_id_unique" ON "pages_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_cta_locales_parent_id_idx" ON "pages_blocks_cta_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_order_idx" ON "pages_blocks_content" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_parent_id_idx" ON "pages_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_path_idx" ON "pages_blocks_content" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_content_locales_locale_parent_id_unique" ON "pages_blocks_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_content_locales_parent_id_idx" ON "pages_blocks_content_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_chips_items_order_idx" ON "pages_blocks_chips_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_chips_items_parent_id_idx" ON "pages_blocks_chips_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_chips_items_locales_locale_parent_id_unique" ON "pages_blocks_chips_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_chips_items_locales_parent_id_idx" ON "pages_blocks_chips_items_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_chips_order_idx" ON "pages_blocks_chips" USING btree ("_order");
  CREATE INDEX "pages_blocks_chips_parent_id_idx" ON "pages_blocks_chips" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_chips_path_idx" ON "pages_blocks_chips" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_chips_locales_locale_parent_id_unique" ON "pages_blocks_chips_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_chips_locales_parent_id_idx" ON "pages_blocks_chips_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tabs_tabs_items_order_idx" ON "pages_blocks_tabs_tabs_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_tabs_tabs_items_parent_id_idx" ON "pages_blocks_tabs_tabs_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_tabs_tabs_items_locales_locale_parent_id_unique" ON "pages_blocks_tabs_tabs_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_tabs_tabs_items_locales_parent_id_idx" ON "pages_blocks_tabs_tabs_items_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tabs_tabs_order_idx" ON "pages_blocks_tabs_tabs" USING btree ("_order");
  CREATE INDEX "pages_blocks_tabs_tabs_parent_id_idx" ON "pages_blocks_tabs_tabs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tabs_tabs_image_idx" ON "pages_blocks_tabs_tabs" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_tabs_tabs_locales_locale_parent_id_unique" ON "pages_blocks_tabs_tabs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_tabs_tabs_locales_parent_id_idx" ON "pages_blocks_tabs_tabs_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tabs_order_idx" ON "pages_blocks_tabs" USING btree ("_order");
  CREATE INDEX "pages_blocks_tabs_parent_id_idx" ON "pages_blocks_tabs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tabs_path_idx" ON "pages_blocks_tabs" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_tabs_locales_locale_parent_id_unique" ON "pages_blocks_tabs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_tabs_locales_parent_id_idx" ON "pages_blocks_tabs_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_comparison_rows_order_idx" ON "pages_blocks_comparison_rows" USING btree ("_order");
  CREATE INDEX "pages_blocks_comparison_rows_parent_id_idx" ON "pages_blocks_comparison_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_comparison_rows_locales_locale_parent_id_unique" ON "pages_blocks_comparison_rows_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_comparison_rows_locales_parent_id_idx" ON "pages_blocks_comparison_rows_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_comparison_order_idx" ON "pages_blocks_comparison" USING btree ("_order");
  CREATE INDEX "pages_blocks_comparison_parent_id_idx" ON "pages_blocks_comparison" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_comparison_path_idx" ON "pages_blocks_comparison" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_comparison_locales_locale_parent_id_unique" ON "pages_blocks_comparison_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_comparison_locales_parent_id_idx" ON "pages_blocks_comparison_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_items_order_idx" ON "pages_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_items_parent_id_idx" ON "pages_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_faq_items_locales_locale_parent_id_unique" ON "pages_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_faq_items_locales_parent_id_idx" ON "pages_blocks_faq_items_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_order_idx" ON "pages_blocks_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_parent_id_idx" ON "pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_path_idx" ON "pages_blocks_faq" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_faq_locales_locale_parent_id_unique" ON "pages_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_faq_locales_parent_id_idx" ON "pages_blocks_faq_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_downloads_order_idx" ON "pages_blocks_downloads" USING btree ("_order");
  CREATE INDEX "pages_blocks_downloads_parent_id_idx" ON "pages_blocks_downloads" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_downloads_path_idx" ON "pages_blocks_downloads" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_downloads_locales_locale_parent_id_unique" ON "pages_blocks_downloads_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_downloads_locales_parent_id_idx" ON "pages_blocks_downloads_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_order_idx" ON "pages_blocks_team" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_parent_id_idx" ON "pages_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_path_idx" ON "pages_blocks_team" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_team_locales_locale_parent_id_unique" ON "pages_blocks_team_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_team_locales_parent_id_idx" ON "pages_blocks_team_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_media_block_order_idx" ON "pages_blocks_media_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_media_block_parent_id_idx" ON "pages_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_media_block_path_idx" ON "pages_blocks_media_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_media_block_media_idx" ON "pages_blocks_media_block" USING btree ("media_id");
  CREATE UNIQUE INDEX "pages_blocks_media_block_locales_locale_parent_id_unique" ON "pages_blocks_media_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_media_block_locales_parent_id_idx" ON "pages_blocks_media_block_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_text_links_order_idx" ON "pages_blocks_image_text_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_text_links_parent_id_idx" ON "pages_blocks_image_text_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_image_text_links_locales_locale_parent_id_uniqu" ON "pages_blocks_image_text_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_image_text_links_locales_parent_id_idx" ON "pages_blocks_image_text_links_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_text_order_idx" ON "pages_blocks_image_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_text_parent_id_idx" ON "pages_blocks_image_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_text_path_idx" ON "pages_blocks_image_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_image_text_media_idx" ON "pages_blocks_image_text" USING btree ("media_id");
  CREATE UNIQUE INDEX "pages_blocks_image_text_locales_locale_parent_id_unique" ON "pages_blocks_image_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_image_text_locales_parent_id_idx" ON "pages_blocks_image_text_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_form_block_order_idx" ON "pages_blocks_form_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_form_block_parent_id_idx" ON "pages_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_form_block_path_idx" ON "pages_blocks_form_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_form_block_form_idx" ON "pages_blocks_form_block" USING btree ("form_id");
  CREATE UNIQUE INDEX "pages_blocks_form_block_locales_locale_parent_id_unique" ON "pages_blocks_form_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_form_block_locales_parent_id_idx" ON "pages_blocks_form_block_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_projects_order_idx" ON "pages_blocks_projects" USING btree ("_order");
  CREATE INDEX "pages_blocks_projects_parent_id_idx" ON "pages_blocks_projects" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_projects_path_idx" ON "pages_blocks_projects" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_projects_locales_locale_parent_id_unique" ON "pages_blocks_projects_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_projects_locales_parent_id_idx" ON "pages_blocks_projects_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_jobs_order_idx" ON "pages_blocks_jobs" USING btree ("_order");
  CREATE INDEX "pages_blocks_jobs_parent_id_idx" ON "pages_blocks_jobs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_jobs_path_idx" ON "pages_blocks_jobs" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_jobs_locales_locale_parent_id_unique" ON "pages_blocks_jobs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_jobs_locales_parent_id_idx" ON "pages_blocks_jobs_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_list_panel_items_order_idx" ON "pages_blocks_list_panel_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_list_panel_items_parent_id_idx" ON "pages_blocks_list_panel_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_list_panel_items_locales_locale_parent_id_uniqu" ON "pages_blocks_list_panel_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_list_panel_items_locales_parent_id_idx" ON "pages_blocks_list_panel_items_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_list_panel_order_idx" ON "pages_blocks_list_panel" USING btree ("_order");
  CREATE INDEX "pages_blocks_list_panel_parent_id_idx" ON "pages_blocks_list_panel" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_list_panel_path_idx" ON "pages_blocks_list_panel" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_list_panel_locales_locale_parent_id_unique" ON "pages_blocks_list_panel_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_list_panel_locales_parent_id_idx" ON "pages_blocks_list_panel_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rfq_card_order_idx" ON "pages_blocks_rfq_card" USING btree ("_order");
  CREATE INDEX "pages_blocks_rfq_card_parent_id_idx" ON "pages_blocks_rfq_card" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rfq_card_path_idx" ON "pages_blocks_rfq_card" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_rfq_card_locales_locale_parent_id_unique" ON "pages_blocks_rfq_card_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_rfq_card_locales_parent_id_idx" ON "pages_blocks_rfq_card_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_reusable_order_idx" ON "pages_blocks_reusable" USING btree ("_order");
  CREATE INDEX "pages_blocks_reusable_parent_id_idx" ON "pages_blocks_reusable" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_reusable_path_idx" ON "pages_blocks_reusable" USING btree ("_path");
  CREATE INDEX "pages_blocks_reusable_section_idx" ON "pages_blocks_reusable" USING btree ("section_id");
  CREATE INDEX "pages_breadcrumbs_order_idx" ON "pages_breadcrumbs" USING btree ("_order");
  CREATE INDEX "pages_breadcrumbs_parent_id_idx" ON "pages_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX "pages_breadcrumbs_locale_idx" ON "pages_breadcrumbs" USING btree ("_locale");
  CREATE INDEX "pages_breadcrumbs_doc_idx" ON "pages_breadcrumbs" USING btree ("doc_id");
  CREATE INDEX "pages_hero_hero_media_idx" ON "pages" USING btree ("hero_media_id");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_path_idx" ON "pages" USING btree ("path");
  CREATE INDEX "pages_parent_idx" ON "pages" USING btree ("parent_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_locales_parent_id_idx" ON "pages_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_pages_id_idx" ON "pages_rels" USING btree ("pages_id");
  CREATE INDEX "pages_rels_divisions_id_idx" ON "pages_rels" USING btree ("divisions_id");
  CREATE INDEX "pages_rels_projects_id_idx" ON "pages_rels" USING btree ("projects_id");
  CREATE INDEX "pages_rels_job_openings_id_idx" ON "pages_rels" USING btree ("job_openings_id");
  CREATE INDEX "pages_rels_news_id_idx" ON "pages_rels" USING btree ("news_id");
  CREATE INDEX "pages_rels_partners_id_idx" ON "pages_rels" USING btree ("partners_id");
  CREATE INDEX "pages_rels_documents_id_idx" ON "pages_rels" USING btree ("documents_id");
  CREATE INDEX "pages_rels_team_members_id_idx" ON "pages_rels" USING btree ("team_members_id");
  CREATE INDEX "_pages_v_version_hero_links_order_idx" ON "_pages_v_version_hero_links" USING btree ("_order");
  CREATE INDEX "_pages_v_version_hero_links_parent_id_idx" ON "_pages_v_version_hero_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_version_hero_links_locales_locale_parent_id_unique" ON "_pages_v_version_hero_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_version_hero_links_locales_parent_id_idx" ON "_pages_v_version_hero_links_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_hero_panel_items_order_idx" ON "_pages_v_version_hero_panel_items" USING btree ("_order");
  CREATE INDEX "_pages_v_version_hero_panel_items_parent_id_idx" ON "_pages_v_version_hero_panel_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_version_hero_panel_items_locales_locale_parent_id_u" ON "_pages_v_version_hero_panel_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_version_hero_panel_items_locales_parent_id_idx" ON "_pages_v_version_hero_panel_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_hero_tiles_order_idx" ON "_pages_v_version_hero_tiles" USING btree ("_order");
  CREATE INDEX "_pages_v_version_hero_tiles_parent_id_idx" ON "_pages_v_version_hero_tiles" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_version_hero_tiles_locales_locale_parent_id_unique" ON "_pages_v_version_hero_tiles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_version_hero_tiles_locales_parent_id_idx" ON "_pages_v_version_hero_tiles_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_hero_stats_order_idx" ON "_pages_v_version_hero_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_version_hero_stats_parent_id_idx" ON "_pages_v_version_hero_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_version_hero_stats_locales_locale_parent_id_unique" ON "_pages_v_version_hero_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_version_hero_stats_locales_parent_id_idx" ON "_pages_v_version_hero_stats_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_divisions_grid_order_idx" ON "_pages_v_blocks_divisions_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_divisions_grid_parent_id_idx" ON "_pages_v_blocks_divisions_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_divisions_grid_path_idx" ON "_pages_v_blocks_divisions_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_divisions_grid_locales_locale_parent_id_uniq" ON "_pages_v_blocks_divisions_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_divisions_grid_locales_parent_id_idx" ON "_pages_v_blocks_divisions_grid_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_process_steps_steps_order_idx" ON "_pages_v_blocks_process_steps_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_process_steps_steps_parent_id_idx" ON "_pages_v_blocks_process_steps_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_process_steps_steps_locales_locale_parent_id" ON "_pages_v_blocks_process_steps_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_process_steps_steps_locales_parent_id_idx" ON "_pages_v_blocks_process_steps_steps_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_process_steps_order_idx" ON "_pages_v_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_process_steps_parent_id_idx" ON "_pages_v_blocks_process_steps" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_process_steps_path_idx" ON "_pages_v_blocks_process_steps" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_process_steps_locales_locale_parent_id_uniqu" ON "_pages_v_blocks_process_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_process_steps_locales_parent_id_idx" ON "_pages_v_blocks_process_steps_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_cards_cards_items_order_idx" ON "_pages_v_blocks_feature_cards_cards_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_cards_cards_items_parent_id_idx" ON "_pages_v_blocks_feature_cards_cards_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_feature_cards_cards_items_locales_locale_par" ON "_pages_v_blocks_feature_cards_cards_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_cards_cards_items_locales_parent_idx" ON "_pages_v_blocks_feature_cards_cards_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_cards_cards_order_idx" ON "_pages_v_blocks_feature_cards_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_cards_cards_parent_id_idx" ON "_pages_v_blocks_feature_cards_cards" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_feature_cards_cards_locales_locale_parent_id" ON "_pages_v_blocks_feature_cards_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_cards_cards_locales_parent_id_idx" ON "_pages_v_blocks_feature_cards_cards_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_cards_order_idx" ON "_pages_v_blocks_feature_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_cards_parent_id_idx" ON "_pages_v_blocks_feature_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_cards_path_idx" ON "_pages_v_blocks_feature_cards" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_feature_cards_locales_locale_parent_id_uniqu" ON "_pages_v_blocks_feature_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_cards_locales_parent_id_idx" ON "_pages_v_blocks_feature_cards_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_items_order_idx" ON "_pages_v_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_items_parent_id_idx" ON "_pages_v_blocks_stats_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_stats_items_locales_locale_parent_id_unique" ON "_pages_v_blocks_stats_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_items_locales_parent_id_idx" ON "_pages_v_blocks_stats_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_order_idx" ON "_pages_v_blocks_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_parent_id_idx" ON "_pages_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_path_idx" ON "_pages_v_blocks_stats" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_logos_order_idx" ON "_pages_v_blocks_logos" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_logos_parent_id_idx" ON "_pages_v_blocks_logos" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_logos_path_idx" ON "_pages_v_blocks_logos" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_logos_locales_locale_parent_id_unique" ON "_pages_v_blocks_logos_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_logos_locales_parent_id_idx" ON "_pages_v_blocks_logos_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_links_order_idx" ON "_pages_v_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_links_parent_id_idx" ON "_pages_v_blocks_cta_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_cta_links_locales_locale_parent_id_unique" ON "_pages_v_blocks_cta_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_links_locales_parent_id_idx" ON "_pages_v_blocks_cta_links_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_order_idx" ON "_pages_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_parent_id_idx" ON "_pages_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_path_idx" ON "_pages_v_blocks_cta" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_cta_locales_locale_parent_id_unique" ON "_pages_v_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_locales_parent_id_idx" ON "_pages_v_blocks_cta_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_content_order_idx" ON "_pages_v_blocks_content" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_parent_id_idx" ON "_pages_v_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_content_path_idx" ON "_pages_v_blocks_content" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_content_locales_locale_parent_id_unique" ON "_pages_v_blocks_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_content_locales_parent_id_idx" ON "_pages_v_blocks_content_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_chips_items_order_idx" ON "_pages_v_blocks_chips_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_chips_items_parent_id_idx" ON "_pages_v_blocks_chips_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_chips_items_locales_locale_parent_id_unique" ON "_pages_v_blocks_chips_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_chips_items_locales_parent_id_idx" ON "_pages_v_blocks_chips_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_chips_order_idx" ON "_pages_v_blocks_chips" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_chips_parent_id_idx" ON "_pages_v_blocks_chips" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_chips_path_idx" ON "_pages_v_blocks_chips" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_chips_locales_locale_parent_id_unique" ON "_pages_v_blocks_chips_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_chips_locales_parent_id_idx" ON "_pages_v_blocks_chips_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_tabs_tabs_items_order_idx" ON "_pages_v_blocks_tabs_tabs_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_tabs_tabs_items_parent_id_idx" ON "_pages_v_blocks_tabs_tabs_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_tabs_tabs_items_locales_locale_parent_id_uni" ON "_pages_v_blocks_tabs_tabs_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_tabs_tabs_items_locales_parent_id_idx" ON "_pages_v_blocks_tabs_tabs_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_tabs_tabs_order_idx" ON "_pages_v_blocks_tabs_tabs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_tabs_tabs_parent_id_idx" ON "_pages_v_blocks_tabs_tabs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_tabs_tabs_image_idx" ON "_pages_v_blocks_tabs_tabs" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_tabs_tabs_locales_locale_parent_id_unique" ON "_pages_v_blocks_tabs_tabs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_tabs_tabs_locales_parent_id_idx" ON "_pages_v_blocks_tabs_tabs_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_tabs_order_idx" ON "_pages_v_blocks_tabs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_tabs_parent_id_idx" ON "_pages_v_blocks_tabs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_tabs_path_idx" ON "_pages_v_blocks_tabs" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_tabs_locales_locale_parent_id_unique" ON "_pages_v_blocks_tabs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_tabs_locales_parent_id_idx" ON "_pages_v_blocks_tabs_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_comparison_rows_order_idx" ON "_pages_v_blocks_comparison_rows" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_comparison_rows_parent_id_idx" ON "_pages_v_blocks_comparison_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_comparison_rows_locales_locale_parent_id_uni" ON "_pages_v_blocks_comparison_rows_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_comparison_rows_locales_parent_id_idx" ON "_pages_v_blocks_comparison_rows_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_comparison_order_idx" ON "_pages_v_blocks_comparison" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_comparison_parent_id_idx" ON "_pages_v_blocks_comparison" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_comparison_path_idx" ON "_pages_v_blocks_comparison" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_comparison_locales_locale_parent_id_unique" ON "_pages_v_blocks_comparison_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_comparison_locales_parent_id_idx" ON "_pages_v_blocks_comparison_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_items_order_idx" ON "_pages_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_items_parent_id_idx" ON "_pages_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_faq_items_locales_locale_parent_id_unique" ON "_pages_v_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_items_locales_parent_id_idx" ON "_pages_v_blocks_faq_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_order_idx" ON "_pages_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_parent_id_idx" ON "_pages_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_path_idx" ON "_pages_v_blocks_faq" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_faq_locales_locale_parent_id_unique" ON "_pages_v_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_locales_parent_id_idx" ON "_pages_v_blocks_faq_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_downloads_order_idx" ON "_pages_v_blocks_downloads" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_downloads_parent_id_idx" ON "_pages_v_blocks_downloads" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_downloads_path_idx" ON "_pages_v_blocks_downloads" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_downloads_locales_locale_parent_id_unique" ON "_pages_v_blocks_downloads_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_downloads_locales_parent_id_idx" ON "_pages_v_blocks_downloads_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_order_idx" ON "_pages_v_blocks_team" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_parent_id_idx" ON "_pages_v_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_path_idx" ON "_pages_v_blocks_team" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_team_locales_locale_parent_id_unique" ON "_pages_v_blocks_team_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_team_locales_parent_id_idx" ON "_pages_v_blocks_team_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_media_block_order_idx" ON "_pages_v_blocks_media_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_media_block_parent_id_idx" ON "_pages_v_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_media_block_path_idx" ON "_pages_v_blocks_media_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_media_block_media_idx" ON "_pages_v_blocks_media_block" USING btree ("media_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_media_block_locales_locale_parent_id_unique" ON "_pages_v_blocks_media_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_media_block_locales_parent_id_idx" ON "_pages_v_blocks_media_block_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_image_text_links_order_idx" ON "_pages_v_blocks_image_text_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_image_text_links_parent_id_idx" ON "_pages_v_blocks_image_text_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_image_text_links_locales_locale_parent_id_un" ON "_pages_v_blocks_image_text_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_image_text_links_locales_parent_id_idx" ON "_pages_v_blocks_image_text_links_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_image_text_order_idx" ON "_pages_v_blocks_image_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_image_text_parent_id_idx" ON "_pages_v_blocks_image_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_image_text_path_idx" ON "_pages_v_blocks_image_text" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_image_text_media_idx" ON "_pages_v_blocks_image_text" USING btree ("media_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_image_text_locales_locale_parent_id_unique" ON "_pages_v_blocks_image_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_image_text_locales_parent_id_idx" ON "_pages_v_blocks_image_text_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_form_block_order_idx" ON "_pages_v_blocks_form_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_form_block_parent_id_idx" ON "_pages_v_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_form_block_path_idx" ON "_pages_v_blocks_form_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_form_block_form_idx" ON "_pages_v_blocks_form_block" USING btree ("form_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_form_block_locales_locale_parent_id_unique" ON "_pages_v_blocks_form_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_form_block_locales_parent_id_idx" ON "_pages_v_blocks_form_block_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_projects_order_idx" ON "_pages_v_blocks_projects" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_projects_parent_id_idx" ON "_pages_v_blocks_projects" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_projects_path_idx" ON "_pages_v_blocks_projects" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_projects_locales_locale_parent_id_unique" ON "_pages_v_blocks_projects_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_projects_locales_parent_id_idx" ON "_pages_v_blocks_projects_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_jobs_order_idx" ON "_pages_v_blocks_jobs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_jobs_parent_id_idx" ON "_pages_v_blocks_jobs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_jobs_path_idx" ON "_pages_v_blocks_jobs" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_jobs_locales_locale_parent_id_unique" ON "_pages_v_blocks_jobs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_jobs_locales_parent_id_idx" ON "_pages_v_blocks_jobs_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_list_panel_items_order_idx" ON "_pages_v_blocks_list_panel_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_list_panel_items_parent_id_idx" ON "_pages_v_blocks_list_panel_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_list_panel_items_locales_locale_parent_id_un" ON "_pages_v_blocks_list_panel_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_list_panel_items_locales_parent_id_idx" ON "_pages_v_blocks_list_panel_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_list_panel_order_idx" ON "_pages_v_blocks_list_panel" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_list_panel_parent_id_idx" ON "_pages_v_blocks_list_panel" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_list_panel_path_idx" ON "_pages_v_blocks_list_panel" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_list_panel_locales_locale_parent_id_unique" ON "_pages_v_blocks_list_panel_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_list_panel_locales_parent_id_idx" ON "_pages_v_blocks_list_panel_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_rfq_card_order_idx" ON "_pages_v_blocks_rfq_card" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_rfq_card_parent_id_idx" ON "_pages_v_blocks_rfq_card" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_rfq_card_path_idx" ON "_pages_v_blocks_rfq_card" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_rfq_card_locales_locale_parent_id_unique" ON "_pages_v_blocks_rfq_card_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_rfq_card_locales_parent_id_idx" ON "_pages_v_blocks_rfq_card_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_reusable_order_idx" ON "_pages_v_blocks_reusable" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_reusable_parent_id_idx" ON "_pages_v_blocks_reusable" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_reusable_path_idx" ON "_pages_v_blocks_reusable" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_reusable_section_idx" ON "_pages_v_blocks_reusable" USING btree ("section_id");
  CREATE INDEX "_pages_v_version_breadcrumbs_order_idx" ON "_pages_v_version_breadcrumbs" USING btree ("_order");
  CREATE INDEX "_pages_v_version_breadcrumbs_parent_id_idx" ON "_pages_v_version_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_breadcrumbs_locale_idx" ON "_pages_v_version_breadcrumbs" USING btree ("_locale");
  CREATE INDEX "_pages_v_version_breadcrumbs_doc_idx" ON "_pages_v_version_breadcrumbs" USING btree ("doc_id");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_hero_version_hero_media_idx" ON "_pages_v" USING btree ("version_hero_media_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_path_idx" ON "_pages_v" USING btree ("version_path");
  CREATE INDEX "_pages_v_version_version_parent_idx" ON "_pages_v" USING btree ("version_parent_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_snapshot_idx" ON "_pages_v" USING btree ("snapshot");
  CREATE INDEX "_pages_v_published_locale_idx" ON "_pages_v" USING btree ("published_locale");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_pages_v_locales_locale_parent_id_unique" ON "_pages_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_locales_parent_id_idx" ON "_pages_v_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_pages_id_idx" ON "_pages_v_rels" USING btree ("pages_id");
  CREATE INDEX "_pages_v_rels_divisions_id_idx" ON "_pages_v_rels" USING btree ("divisions_id");
  CREATE INDEX "_pages_v_rels_projects_id_idx" ON "_pages_v_rels" USING btree ("projects_id");
  CREATE INDEX "_pages_v_rels_job_openings_id_idx" ON "_pages_v_rels" USING btree ("job_openings_id");
  CREATE INDEX "_pages_v_rels_news_id_idx" ON "_pages_v_rels" USING btree ("news_id");
  CREATE INDEX "_pages_v_rels_partners_id_idx" ON "_pages_v_rels" USING btree ("partners_id");
  CREATE INDEX "_pages_v_rels_documents_id_idx" ON "_pages_v_rels" USING btree ("documents_id");
  CREATE INDEX "_pages_v_rels_team_members_id_idx" ON "_pages_v_rels" USING btree ("team_members_id");
  CREATE INDEX "divisions_chips_order_idx" ON "divisions_chips" USING btree ("_order");
  CREATE INDEX "divisions_chips_parent_id_idx" ON "divisions_chips" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "divisions_chips_locales_locale_parent_id_unique" ON "divisions_chips_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "divisions_chips_locales_parent_id_idx" ON "divisions_chips_locales" USING btree ("_parent_id");
  CREATE INDEX "divisions_hero_links_order_idx" ON "divisions_hero_links" USING btree ("_order");
  CREATE INDEX "divisions_hero_links_parent_id_idx" ON "divisions_hero_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "divisions_hero_links_locales_locale_parent_id_unique" ON "divisions_hero_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "divisions_hero_links_locales_parent_id_idx" ON "divisions_hero_links_locales" USING btree ("_parent_id");
  CREATE INDEX "divisions_hero_panel_items_order_idx" ON "divisions_hero_panel_items" USING btree ("_order");
  CREATE INDEX "divisions_hero_panel_items_parent_id_idx" ON "divisions_hero_panel_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "divisions_hero_panel_items_locales_locale_parent_id_unique" ON "divisions_hero_panel_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "divisions_hero_panel_items_locales_parent_id_idx" ON "divisions_hero_panel_items_locales" USING btree ("_parent_id");
  CREATE INDEX "divisions_hero_tiles_order_idx" ON "divisions_hero_tiles" USING btree ("_order");
  CREATE INDEX "divisions_hero_tiles_parent_id_idx" ON "divisions_hero_tiles" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "divisions_hero_tiles_locales_locale_parent_id_unique" ON "divisions_hero_tiles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "divisions_hero_tiles_locales_parent_id_idx" ON "divisions_hero_tiles_locales" USING btree ("_parent_id");
  CREATE INDEX "divisions_hero_stats_order_idx" ON "divisions_hero_stats" USING btree ("_order");
  CREATE INDEX "divisions_hero_stats_parent_id_idx" ON "divisions_hero_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "divisions_hero_stats_locales_locale_parent_id_unique" ON "divisions_hero_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "divisions_hero_stats_locales_parent_id_idx" ON "divisions_hero_stats_locales" USING btree ("_parent_id");
  CREATE INDEX "divisions_blocks_divisions_grid_order_idx" ON "divisions_blocks_divisions_grid" USING btree ("_order");
  CREATE INDEX "divisions_blocks_divisions_grid_parent_id_idx" ON "divisions_blocks_divisions_grid" USING btree ("_parent_id");
  CREATE INDEX "divisions_blocks_divisions_grid_path_idx" ON "divisions_blocks_divisions_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "divisions_blocks_divisions_grid_locales_locale_parent_id_uni" ON "divisions_blocks_divisions_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "divisions_blocks_divisions_grid_locales_parent_id_idx" ON "divisions_blocks_divisions_grid_locales" USING btree ("_parent_id");
  CREATE INDEX "divisions_blocks_process_steps_steps_order_idx" ON "divisions_blocks_process_steps_steps" USING btree ("_order");
  CREATE INDEX "divisions_blocks_process_steps_steps_parent_id_idx" ON "divisions_blocks_process_steps_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "divisions_blocks_process_steps_steps_locales_locale_parent_i" ON "divisions_blocks_process_steps_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "divisions_blocks_process_steps_steps_locales_parent_id_idx" ON "divisions_blocks_process_steps_steps_locales" USING btree ("_parent_id");
  CREATE INDEX "divisions_blocks_process_steps_order_idx" ON "divisions_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "divisions_blocks_process_steps_parent_id_idx" ON "divisions_blocks_process_steps" USING btree ("_parent_id");
  CREATE INDEX "divisions_blocks_process_steps_path_idx" ON "divisions_blocks_process_steps" USING btree ("_path");
  CREATE UNIQUE INDEX "divisions_blocks_process_steps_locales_locale_parent_id_uniq" ON "divisions_blocks_process_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "divisions_blocks_process_steps_locales_parent_id_idx" ON "divisions_blocks_process_steps_locales" USING btree ("_parent_id");
  CREATE INDEX "divisions_blocks_feature_cards_cards_items_order_idx" ON "divisions_blocks_feature_cards_cards_items" USING btree ("_order");
  CREATE INDEX "divisions_blocks_feature_cards_cards_items_parent_id_idx" ON "divisions_blocks_feature_cards_cards_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "divisions_blocks_feature_cards_cards_items_locales_locale_pa" ON "divisions_blocks_feature_cards_cards_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "divisions_blocks_feature_cards_cards_items_locales_paren_idx" ON "divisions_blocks_feature_cards_cards_items_locales" USING btree ("_parent_id");
  CREATE INDEX "divisions_blocks_feature_cards_cards_order_idx" ON "divisions_blocks_feature_cards_cards" USING btree ("_order");
  CREATE INDEX "divisions_blocks_feature_cards_cards_parent_id_idx" ON "divisions_blocks_feature_cards_cards" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "divisions_blocks_feature_cards_cards_locales_locale_parent_i" ON "divisions_blocks_feature_cards_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "divisions_blocks_feature_cards_cards_locales_parent_id_idx" ON "divisions_blocks_feature_cards_cards_locales" USING btree ("_parent_id");
  CREATE INDEX "divisions_blocks_feature_cards_order_idx" ON "divisions_blocks_feature_cards" USING btree ("_order");
  CREATE INDEX "divisions_blocks_feature_cards_parent_id_idx" ON "divisions_blocks_feature_cards" USING btree ("_parent_id");
  CREATE INDEX "divisions_blocks_feature_cards_path_idx" ON "divisions_blocks_feature_cards" USING btree ("_path");
  CREATE UNIQUE INDEX "divisions_blocks_feature_cards_locales_locale_parent_id_uniq" ON "divisions_blocks_feature_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "divisions_blocks_feature_cards_locales_parent_id_idx" ON "divisions_blocks_feature_cards_locales" USING btree ("_parent_id");
  CREATE INDEX "divisions_blocks_stats_items_order_idx" ON "divisions_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "divisions_blocks_stats_items_parent_id_idx" ON "divisions_blocks_stats_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "divisions_blocks_stats_items_locales_locale_parent_id_unique" ON "divisions_blocks_stats_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "divisions_blocks_stats_items_locales_parent_id_idx" ON "divisions_blocks_stats_items_locales" USING btree ("_parent_id");
  CREATE INDEX "divisions_blocks_stats_order_idx" ON "divisions_blocks_stats" USING btree ("_order");
  CREATE INDEX "divisions_blocks_stats_parent_id_idx" ON "divisions_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "divisions_blocks_stats_path_idx" ON "divisions_blocks_stats" USING btree ("_path");
  CREATE INDEX "divisions_blocks_logos_order_idx" ON "divisions_blocks_logos" USING btree ("_order");
  CREATE INDEX "divisions_blocks_logos_parent_id_idx" ON "divisions_blocks_logos" USING btree ("_parent_id");
  CREATE INDEX "divisions_blocks_logos_path_idx" ON "divisions_blocks_logos" USING btree ("_path");
  CREATE UNIQUE INDEX "divisions_blocks_logos_locales_locale_parent_id_unique" ON "divisions_blocks_logos_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "divisions_blocks_logos_locales_parent_id_idx" ON "divisions_blocks_logos_locales" USING btree ("_parent_id");
  CREATE INDEX "divisions_blocks_cta_links_order_idx" ON "divisions_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "divisions_blocks_cta_links_parent_id_idx" ON "divisions_blocks_cta_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "divisions_blocks_cta_links_locales_locale_parent_id_unique" ON "divisions_blocks_cta_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "divisions_blocks_cta_links_locales_parent_id_idx" ON "divisions_blocks_cta_links_locales" USING btree ("_parent_id");
  CREATE INDEX "divisions_blocks_cta_order_idx" ON "divisions_blocks_cta" USING btree ("_order");
  CREATE INDEX "divisions_blocks_cta_parent_id_idx" ON "divisions_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "divisions_blocks_cta_path_idx" ON "divisions_blocks_cta" USING btree ("_path");
  CREATE UNIQUE INDEX "divisions_blocks_cta_locales_locale_parent_id_unique" ON "divisions_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "divisions_blocks_cta_locales_parent_id_idx" ON "divisions_blocks_cta_locales" USING btree ("_parent_id");
  CREATE INDEX "divisions_blocks_content_order_idx" ON "divisions_blocks_content" USING btree ("_order");
  CREATE INDEX "divisions_blocks_content_parent_id_idx" ON "divisions_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "divisions_blocks_content_path_idx" ON "divisions_blocks_content" USING btree ("_path");
  CREATE UNIQUE INDEX "divisions_blocks_content_locales_locale_parent_id_unique" ON "divisions_blocks_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "divisions_blocks_content_locales_parent_id_idx" ON "divisions_blocks_content_locales" USING btree ("_parent_id");
  CREATE INDEX "divisions_blocks_chips_items_order_idx" ON "divisions_blocks_chips_items" USING btree ("_order");
  CREATE INDEX "divisions_blocks_chips_items_parent_id_idx" ON "divisions_blocks_chips_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "divisions_blocks_chips_items_locales_locale_parent_id_unique" ON "divisions_blocks_chips_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "divisions_blocks_chips_items_locales_parent_id_idx" ON "divisions_blocks_chips_items_locales" USING btree ("_parent_id");
  CREATE INDEX "divisions_blocks_chips_order_idx" ON "divisions_blocks_chips" USING btree ("_order");
  CREATE INDEX "divisions_blocks_chips_parent_id_idx" ON "divisions_blocks_chips" USING btree ("_parent_id");
  CREATE INDEX "divisions_blocks_chips_path_idx" ON "divisions_blocks_chips" USING btree ("_path");
  CREATE UNIQUE INDEX "divisions_blocks_chips_locales_locale_parent_id_unique" ON "divisions_blocks_chips_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "divisions_blocks_chips_locales_parent_id_idx" ON "divisions_blocks_chips_locales" USING btree ("_parent_id");
  CREATE INDEX "divisions_blocks_tabs_tabs_items_order_idx" ON "divisions_blocks_tabs_tabs_items" USING btree ("_order");
  CREATE INDEX "divisions_blocks_tabs_tabs_items_parent_id_idx" ON "divisions_blocks_tabs_tabs_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "divisions_blocks_tabs_tabs_items_locales_locale_parent_id_un" ON "divisions_blocks_tabs_tabs_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "divisions_blocks_tabs_tabs_items_locales_parent_id_idx" ON "divisions_blocks_tabs_tabs_items_locales" USING btree ("_parent_id");
  CREATE INDEX "divisions_blocks_tabs_tabs_order_idx" ON "divisions_blocks_tabs_tabs" USING btree ("_order");
  CREATE INDEX "divisions_blocks_tabs_tabs_parent_id_idx" ON "divisions_blocks_tabs_tabs" USING btree ("_parent_id");
  CREATE INDEX "divisions_blocks_tabs_tabs_image_idx" ON "divisions_blocks_tabs_tabs" USING btree ("image_id");
  CREATE UNIQUE INDEX "divisions_blocks_tabs_tabs_locales_locale_parent_id_unique" ON "divisions_blocks_tabs_tabs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "divisions_blocks_tabs_tabs_locales_parent_id_idx" ON "divisions_blocks_tabs_tabs_locales" USING btree ("_parent_id");
  CREATE INDEX "divisions_blocks_tabs_order_idx" ON "divisions_blocks_tabs" USING btree ("_order");
  CREATE INDEX "divisions_blocks_tabs_parent_id_idx" ON "divisions_blocks_tabs" USING btree ("_parent_id");
  CREATE INDEX "divisions_blocks_tabs_path_idx" ON "divisions_blocks_tabs" USING btree ("_path");
  CREATE UNIQUE INDEX "divisions_blocks_tabs_locales_locale_parent_id_unique" ON "divisions_blocks_tabs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "divisions_blocks_tabs_locales_parent_id_idx" ON "divisions_blocks_tabs_locales" USING btree ("_parent_id");
  CREATE INDEX "divisions_blocks_comparison_rows_order_idx" ON "divisions_blocks_comparison_rows" USING btree ("_order");
  CREATE INDEX "divisions_blocks_comparison_rows_parent_id_idx" ON "divisions_blocks_comparison_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "divisions_blocks_comparison_rows_locales_locale_parent_id_un" ON "divisions_blocks_comparison_rows_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "divisions_blocks_comparison_rows_locales_parent_id_idx" ON "divisions_blocks_comparison_rows_locales" USING btree ("_parent_id");
  CREATE INDEX "divisions_blocks_comparison_order_idx" ON "divisions_blocks_comparison" USING btree ("_order");
  CREATE INDEX "divisions_blocks_comparison_parent_id_idx" ON "divisions_blocks_comparison" USING btree ("_parent_id");
  CREATE INDEX "divisions_blocks_comparison_path_idx" ON "divisions_blocks_comparison" USING btree ("_path");
  CREATE UNIQUE INDEX "divisions_blocks_comparison_locales_locale_parent_id_unique" ON "divisions_blocks_comparison_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "divisions_blocks_comparison_locales_parent_id_idx" ON "divisions_blocks_comparison_locales" USING btree ("_parent_id");
  CREATE INDEX "divisions_blocks_faq_items_order_idx" ON "divisions_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "divisions_blocks_faq_items_parent_id_idx" ON "divisions_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "divisions_blocks_faq_items_locales_locale_parent_id_unique" ON "divisions_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "divisions_blocks_faq_items_locales_parent_id_idx" ON "divisions_blocks_faq_items_locales" USING btree ("_parent_id");
  CREATE INDEX "divisions_blocks_faq_order_idx" ON "divisions_blocks_faq" USING btree ("_order");
  CREATE INDEX "divisions_blocks_faq_parent_id_idx" ON "divisions_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "divisions_blocks_faq_path_idx" ON "divisions_blocks_faq" USING btree ("_path");
  CREATE UNIQUE INDEX "divisions_blocks_faq_locales_locale_parent_id_unique" ON "divisions_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "divisions_blocks_faq_locales_parent_id_idx" ON "divisions_blocks_faq_locales" USING btree ("_parent_id");
  CREATE INDEX "divisions_blocks_downloads_order_idx" ON "divisions_blocks_downloads" USING btree ("_order");
  CREATE INDEX "divisions_blocks_downloads_parent_id_idx" ON "divisions_blocks_downloads" USING btree ("_parent_id");
  CREATE INDEX "divisions_blocks_downloads_path_idx" ON "divisions_blocks_downloads" USING btree ("_path");
  CREATE UNIQUE INDEX "divisions_blocks_downloads_locales_locale_parent_id_unique" ON "divisions_blocks_downloads_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "divisions_blocks_downloads_locales_parent_id_idx" ON "divisions_blocks_downloads_locales" USING btree ("_parent_id");
  CREATE INDEX "divisions_blocks_team_order_idx" ON "divisions_blocks_team" USING btree ("_order");
  CREATE INDEX "divisions_blocks_team_parent_id_idx" ON "divisions_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "divisions_blocks_team_path_idx" ON "divisions_blocks_team" USING btree ("_path");
  CREATE UNIQUE INDEX "divisions_blocks_team_locales_locale_parent_id_unique" ON "divisions_blocks_team_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "divisions_blocks_team_locales_parent_id_idx" ON "divisions_blocks_team_locales" USING btree ("_parent_id");
  CREATE INDEX "divisions_blocks_media_block_order_idx" ON "divisions_blocks_media_block" USING btree ("_order");
  CREATE INDEX "divisions_blocks_media_block_parent_id_idx" ON "divisions_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "divisions_blocks_media_block_path_idx" ON "divisions_blocks_media_block" USING btree ("_path");
  CREATE INDEX "divisions_blocks_media_block_media_idx" ON "divisions_blocks_media_block" USING btree ("media_id");
  CREATE UNIQUE INDEX "divisions_blocks_media_block_locales_locale_parent_id_unique" ON "divisions_blocks_media_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "divisions_blocks_media_block_locales_parent_id_idx" ON "divisions_blocks_media_block_locales" USING btree ("_parent_id");
  CREATE INDEX "divisions_blocks_image_text_links_order_idx" ON "divisions_blocks_image_text_links" USING btree ("_order");
  CREATE INDEX "divisions_blocks_image_text_links_parent_id_idx" ON "divisions_blocks_image_text_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "divisions_blocks_image_text_links_locales_locale_parent_id_u" ON "divisions_blocks_image_text_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "divisions_blocks_image_text_links_locales_parent_id_idx" ON "divisions_blocks_image_text_links_locales" USING btree ("_parent_id");
  CREATE INDEX "divisions_blocks_image_text_order_idx" ON "divisions_blocks_image_text" USING btree ("_order");
  CREATE INDEX "divisions_blocks_image_text_parent_id_idx" ON "divisions_blocks_image_text" USING btree ("_parent_id");
  CREATE INDEX "divisions_blocks_image_text_path_idx" ON "divisions_blocks_image_text" USING btree ("_path");
  CREATE INDEX "divisions_blocks_image_text_media_idx" ON "divisions_blocks_image_text" USING btree ("media_id");
  CREATE UNIQUE INDEX "divisions_blocks_image_text_locales_locale_parent_id_unique" ON "divisions_blocks_image_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "divisions_blocks_image_text_locales_parent_id_idx" ON "divisions_blocks_image_text_locales" USING btree ("_parent_id");
  CREATE INDEX "divisions_blocks_form_block_order_idx" ON "divisions_blocks_form_block" USING btree ("_order");
  CREATE INDEX "divisions_blocks_form_block_parent_id_idx" ON "divisions_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX "divisions_blocks_form_block_path_idx" ON "divisions_blocks_form_block" USING btree ("_path");
  CREATE INDEX "divisions_blocks_form_block_form_idx" ON "divisions_blocks_form_block" USING btree ("form_id");
  CREATE UNIQUE INDEX "divisions_blocks_form_block_locales_locale_parent_id_unique" ON "divisions_blocks_form_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "divisions_blocks_form_block_locales_parent_id_idx" ON "divisions_blocks_form_block_locales" USING btree ("_parent_id");
  CREATE INDEX "divisions_blocks_projects_order_idx" ON "divisions_blocks_projects" USING btree ("_order");
  CREATE INDEX "divisions_blocks_projects_parent_id_idx" ON "divisions_blocks_projects" USING btree ("_parent_id");
  CREATE INDEX "divisions_blocks_projects_path_idx" ON "divisions_blocks_projects" USING btree ("_path");
  CREATE UNIQUE INDEX "divisions_blocks_projects_locales_locale_parent_id_unique" ON "divisions_blocks_projects_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "divisions_blocks_projects_locales_parent_id_idx" ON "divisions_blocks_projects_locales" USING btree ("_parent_id");
  CREATE INDEX "divisions_blocks_jobs_order_idx" ON "divisions_blocks_jobs" USING btree ("_order");
  CREATE INDEX "divisions_blocks_jobs_parent_id_idx" ON "divisions_blocks_jobs" USING btree ("_parent_id");
  CREATE INDEX "divisions_blocks_jobs_path_idx" ON "divisions_blocks_jobs" USING btree ("_path");
  CREATE UNIQUE INDEX "divisions_blocks_jobs_locales_locale_parent_id_unique" ON "divisions_blocks_jobs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "divisions_blocks_jobs_locales_parent_id_idx" ON "divisions_blocks_jobs_locales" USING btree ("_parent_id");
  CREATE INDEX "divisions_blocks_list_panel_items_order_idx" ON "divisions_blocks_list_panel_items" USING btree ("_order");
  CREATE INDEX "divisions_blocks_list_panel_items_parent_id_idx" ON "divisions_blocks_list_panel_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "divisions_blocks_list_panel_items_locales_locale_parent_id_u" ON "divisions_blocks_list_panel_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "divisions_blocks_list_panel_items_locales_parent_id_idx" ON "divisions_blocks_list_panel_items_locales" USING btree ("_parent_id");
  CREATE INDEX "divisions_blocks_list_panel_order_idx" ON "divisions_blocks_list_panel" USING btree ("_order");
  CREATE INDEX "divisions_blocks_list_panel_parent_id_idx" ON "divisions_blocks_list_panel" USING btree ("_parent_id");
  CREATE INDEX "divisions_blocks_list_panel_path_idx" ON "divisions_blocks_list_panel" USING btree ("_path");
  CREATE UNIQUE INDEX "divisions_blocks_list_panel_locales_locale_parent_id_unique" ON "divisions_blocks_list_panel_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "divisions_blocks_list_panel_locales_parent_id_idx" ON "divisions_blocks_list_panel_locales" USING btree ("_parent_id");
  CREATE INDEX "divisions_blocks_rfq_card_order_idx" ON "divisions_blocks_rfq_card" USING btree ("_order");
  CREATE INDEX "divisions_blocks_rfq_card_parent_id_idx" ON "divisions_blocks_rfq_card" USING btree ("_parent_id");
  CREATE INDEX "divisions_blocks_rfq_card_path_idx" ON "divisions_blocks_rfq_card" USING btree ("_path");
  CREATE UNIQUE INDEX "divisions_blocks_rfq_card_locales_locale_parent_id_unique" ON "divisions_blocks_rfq_card_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "divisions_blocks_rfq_card_locales_parent_id_idx" ON "divisions_blocks_rfq_card_locales" USING btree ("_parent_id");
  CREATE INDEX "divisions_blocks_reusable_order_idx" ON "divisions_blocks_reusable" USING btree ("_order");
  CREATE INDEX "divisions_blocks_reusable_parent_id_idx" ON "divisions_blocks_reusable" USING btree ("_parent_id");
  CREATE INDEX "divisions_blocks_reusable_path_idx" ON "divisions_blocks_reusable" USING btree ("_path");
  CREATE INDEX "divisions_blocks_reusable_section_idx" ON "divisions_blocks_reusable" USING btree ("section_id");
  CREATE INDEX "divisions_card_image_idx" ON "divisions" USING btree ("card_image_id");
  CREATE INDEX "divisions_hero_hero_media_idx" ON "divisions" USING btree ("hero_media_id");
  CREATE UNIQUE INDEX "divisions_slug_idx" ON "divisions" USING btree ("slug");
  CREATE INDEX "divisions_updated_at_idx" ON "divisions" USING btree ("updated_at");
  CREATE INDEX "divisions_created_at_idx" ON "divisions" USING btree ("created_at");
  CREATE INDEX "divisions__status_idx" ON "divisions" USING btree ("_status");
  CREATE INDEX "divisions_meta_meta_image_idx" ON "divisions_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "divisions_locales_locale_parent_id_unique" ON "divisions_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "divisions_locales_parent_id_idx" ON "divisions_locales" USING btree ("_parent_id");
  CREATE INDEX "divisions_rels_order_idx" ON "divisions_rels" USING btree ("order");
  CREATE INDEX "divisions_rels_parent_idx" ON "divisions_rels" USING btree ("parent_id");
  CREATE INDEX "divisions_rels_path_idx" ON "divisions_rels" USING btree ("path");
  CREATE INDEX "divisions_rels_pages_id_idx" ON "divisions_rels" USING btree ("pages_id");
  CREATE INDEX "divisions_rels_divisions_id_idx" ON "divisions_rels" USING btree ("divisions_id");
  CREATE INDEX "divisions_rels_projects_id_idx" ON "divisions_rels" USING btree ("projects_id");
  CREATE INDEX "divisions_rels_job_openings_id_idx" ON "divisions_rels" USING btree ("job_openings_id");
  CREATE INDEX "divisions_rels_news_id_idx" ON "divisions_rels" USING btree ("news_id");
  CREATE INDEX "divisions_rels_partners_id_idx" ON "divisions_rels" USING btree ("partners_id");
  CREATE INDEX "divisions_rels_documents_id_idx" ON "divisions_rels" USING btree ("documents_id");
  CREATE INDEX "divisions_rels_team_members_id_idx" ON "divisions_rels" USING btree ("team_members_id");
  CREATE INDEX "_divisions_v_version_chips_order_idx" ON "_divisions_v_version_chips" USING btree ("_order");
  CREATE INDEX "_divisions_v_version_chips_parent_id_idx" ON "_divisions_v_version_chips" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_divisions_v_version_chips_locales_locale_parent_id_unique" ON "_divisions_v_version_chips_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_divisions_v_version_chips_locales_parent_id_idx" ON "_divisions_v_version_chips_locales" USING btree ("_parent_id");
  CREATE INDEX "_divisions_v_version_hero_links_order_idx" ON "_divisions_v_version_hero_links" USING btree ("_order");
  CREATE INDEX "_divisions_v_version_hero_links_parent_id_idx" ON "_divisions_v_version_hero_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_divisions_v_version_hero_links_locales_locale_parent_id_uni" ON "_divisions_v_version_hero_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_divisions_v_version_hero_links_locales_parent_id_idx" ON "_divisions_v_version_hero_links_locales" USING btree ("_parent_id");
  CREATE INDEX "_divisions_v_version_hero_panel_items_order_idx" ON "_divisions_v_version_hero_panel_items" USING btree ("_order");
  CREATE INDEX "_divisions_v_version_hero_panel_items_parent_id_idx" ON "_divisions_v_version_hero_panel_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_divisions_v_version_hero_panel_items_locales_locale_parent_" ON "_divisions_v_version_hero_panel_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_divisions_v_version_hero_panel_items_locales_parent_id_idx" ON "_divisions_v_version_hero_panel_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_divisions_v_version_hero_tiles_order_idx" ON "_divisions_v_version_hero_tiles" USING btree ("_order");
  CREATE INDEX "_divisions_v_version_hero_tiles_parent_id_idx" ON "_divisions_v_version_hero_tiles" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_divisions_v_version_hero_tiles_locales_locale_parent_id_uni" ON "_divisions_v_version_hero_tiles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_divisions_v_version_hero_tiles_locales_parent_id_idx" ON "_divisions_v_version_hero_tiles_locales" USING btree ("_parent_id");
  CREATE INDEX "_divisions_v_version_hero_stats_order_idx" ON "_divisions_v_version_hero_stats" USING btree ("_order");
  CREATE INDEX "_divisions_v_version_hero_stats_parent_id_idx" ON "_divisions_v_version_hero_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_divisions_v_version_hero_stats_locales_locale_parent_id_uni" ON "_divisions_v_version_hero_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_divisions_v_version_hero_stats_locales_parent_id_idx" ON "_divisions_v_version_hero_stats_locales" USING btree ("_parent_id");
  CREATE INDEX "_divisions_v_blocks_divisions_grid_order_idx" ON "_divisions_v_blocks_divisions_grid" USING btree ("_order");
  CREATE INDEX "_divisions_v_blocks_divisions_grid_parent_id_idx" ON "_divisions_v_blocks_divisions_grid" USING btree ("_parent_id");
  CREATE INDEX "_divisions_v_blocks_divisions_grid_path_idx" ON "_divisions_v_blocks_divisions_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "_divisions_v_blocks_divisions_grid_locales_locale_parent_id_" ON "_divisions_v_blocks_divisions_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_divisions_v_blocks_divisions_grid_locales_parent_id_idx" ON "_divisions_v_blocks_divisions_grid_locales" USING btree ("_parent_id");
  CREATE INDEX "_divisions_v_blocks_process_steps_steps_order_idx" ON "_divisions_v_blocks_process_steps_steps" USING btree ("_order");
  CREATE INDEX "_divisions_v_blocks_process_steps_steps_parent_id_idx" ON "_divisions_v_blocks_process_steps_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_divisions_v_blocks_process_steps_steps_locales_locale_paren" ON "_divisions_v_blocks_process_steps_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_divisions_v_blocks_process_steps_steps_locales_parent_i_idx" ON "_divisions_v_blocks_process_steps_steps_locales" USING btree ("_parent_id");
  CREATE INDEX "_divisions_v_blocks_process_steps_order_idx" ON "_divisions_v_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "_divisions_v_blocks_process_steps_parent_id_idx" ON "_divisions_v_blocks_process_steps" USING btree ("_parent_id");
  CREATE INDEX "_divisions_v_blocks_process_steps_path_idx" ON "_divisions_v_blocks_process_steps" USING btree ("_path");
  CREATE UNIQUE INDEX "_divisions_v_blocks_process_steps_locales_locale_parent_id_u" ON "_divisions_v_blocks_process_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_divisions_v_blocks_process_steps_locales_parent_id_idx" ON "_divisions_v_blocks_process_steps_locales" USING btree ("_parent_id");
  CREATE INDEX "_divisions_v_blocks_feature_cards_cards_items_order_idx" ON "_divisions_v_blocks_feature_cards_cards_items" USING btree ("_order");
  CREATE INDEX "_divisions_v_blocks_feature_cards_cards_items_parent_id_idx" ON "_divisions_v_blocks_feature_cards_cards_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_divisions_v_blocks_feature_cards_cards_items_locales_locale" ON "_divisions_v_blocks_feature_cards_cards_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_divisions_v_blocks_feature_cards_cards_items_locales_pa_idx" ON "_divisions_v_blocks_feature_cards_cards_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_divisions_v_blocks_feature_cards_cards_order_idx" ON "_divisions_v_blocks_feature_cards_cards" USING btree ("_order");
  CREATE INDEX "_divisions_v_blocks_feature_cards_cards_parent_id_idx" ON "_divisions_v_blocks_feature_cards_cards" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_divisions_v_blocks_feature_cards_cards_locales_locale_paren" ON "_divisions_v_blocks_feature_cards_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_divisions_v_blocks_feature_cards_cards_locales_parent_i_idx" ON "_divisions_v_blocks_feature_cards_cards_locales" USING btree ("_parent_id");
  CREATE INDEX "_divisions_v_blocks_feature_cards_order_idx" ON "_divisions_v_blocks_feature_cards" USING btree ("_order");
  CREATE INDEX "_divisions_v_blocks_feature_cards_parent_id_idx" ON "_divisions_v_blocks_feature_cards" USING btree ("_parent_id");
  CREATE INDEX "_divisions_v_blocks_feature_cards_path_idx" ON "_divisions_v_blocks_feature_cards" USING btree ("_path");
  CREATE UNIQUE INDEX "_divisions_v_blocks_feature_cards_locales_locale_parent_id_u" ON "_divisions_v_blocks_feature_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_divisions_v_blocks_feature_cards_locales_parent_id_idx" ON "_divisions_v_blocks_feature_cards_locales" USING btree ("_parent_id");
  CREATE INDEX "_divisions_v_blocks_stats_items_order_idx" ON "_divisions_v_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "_divisions_v_blocks_stats_items_parent_id_idx" ON "_divisions_v_blocks_stats_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_divisions_v_blocks_stats_items_locales_locale_parent_id_uni" ON "_divisions_v_blocks_stats_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_divisions_v_blocks_stats_items_locales_parent_id_idx" ON "_divisions_v_blocks_stats_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_divisions_v_blocks_stats_order_idx" ON "_divisions_v_blocks_stats" USING btree ("_order");
  CREATE INDEX "_divisions_v_blocks_stats_parent_id_idx" ON "_divisions_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "_divisions_v_blocks_stats_path_idx" ON "_divisions_v_blocks_stats" USING btree ("_path");
  CREATE INDEX "_divisions_v_blocks_logos_order_idx" ON "_divisions_v_blocks_logos" USING btree ("_order");
  CREATE INDEX "_divisions_v_blocks_logos_parent_id_idx" ON "_divisions_v_blocks_logos" USING btree ("_parent_id");
  CREATE INDEX "_divisions_v_blocks_logos_path_idx" ON "_divisions_v_blocks_logos" USING btree ("_path");
  CREATE UNIQUE INDEX "_divisions_v_blocks_logos_locales_locale_parent_id_unique" ON "_divisions_v_blocks_logos_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_divisions_v_blocks_logos_locales_parent_id_idx" ON "_divisions_v_blocks_logos_locales" USING btree ("_parent_id");
  CREATE INDEX "_divisions_v_blocks_cta_links_order_idx" ON "_divisions_v_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "_divisions_v_blocks_cta_links_parent_id_idx" ON "_divisions_v_blocks_cta_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_divisions_v_blocks_cta_links_locales_locale_parent_id_uniqu" ON "_divisions_v_blocks_cta_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_divisions_v_blocks_cta_links_locales_parent_id_idx" ON "_divisions_v_blocks_cta_links_locales" USING btree ("_parent_id");
  CREATE INDEX "_divisions_v_blocks_cta_order_idx" ON "_divisions_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_divisions_v_blocks_cta_parent_id_idx" ON "_divisions_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_divisions_v_blocks_cta_path_idx" ON "_divisions_v_blocks_cta" USING btree ("_path");
  CREATE UNIQUE INDEX "_divisions_v_blocks_cta_locales_locale_parent_id_unique" ON "_divisions_v_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_divisions_v_blocks_cta_locales_parent_id_idx" ON "_divisions_v_blocks_cta_locales" USING btree ("_parent_id");
  CREATE INDEX "_divisions_v_blocks_content_order_idx" ON "_divisions_v_blocks_content" USING btree ("_order");
  CREATE INDEX "_divisions_v_blocks_content_parent_id_idx" ON "_divisions_v_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "_divisions_v_blocks_content_path_idx" ON "_divisions_v_blocks_content" USING btree ("_path");
  CREATE UNIQUE INDEX "_divisions_v_blocks_content_locales_locale_parent_id_unique" ON "_divisions_v_blocks_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_divisions_v_blocks_content_locales_parent_id_idx" ON "_divisions_v_blocks_content_locales" USING btree ("_parent_id");
  CREATE INDEX "_divisions_v_blocks_chips_items_order_idx" ON "_divisions_v_blocks_chips_items" USING btree ("_order");
  CREATE INDEX "_divisions_v_blocks_chips_items_parent_id_idx" ON "_divisions_v_blocks_chips_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_divisions_v_blocks_chips_items_locales_locale_parent_id_uni" ON "_divisions_v_blocks_chips_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_divisions_v_blocks_chips_items_locales_parent_id_idx" ON "_divisions_v_blocks_chips_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_divisions_v_blocks_chips_order_idx" ON "_divisions_v_blocks_chips" USING btree ("_order");
  CREATE INDEX "_divisions_v_blocks_chips_parent_id_idx" ON "_divisions_v_blocks_chips" USING btree ("_parent_id");
  CREATE INDEX "_divisions_v_blocks_chips_path_idx" ON "_divisions_v_blocks_chips" USING btree ("_path");
  CREATE UNIQUE INDEX "_divisions_v_blocks_chips_locales_locale_parent_id_unique" ON "_divisions_v_blocks_chips_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_divisions_v_blocks_chips_locales_parent_id_idx" ON "_divisions_v_blocks_chips_locales" USING btree ("_parent_id");
  CREATE INDEX "_divisions_v_blocks_tabs_tabs_items_order_idx" ON "_divisions_v_blocks_tabs_tabs_items" USING btree ("_order");
  CREATE INDEX "_divisions_v_blocks_tabs_tabs_items_parent_id_idx" ON "_divisions_v_blocks_tabs_tabs_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_divisions_v_blocks_tabs_tabs_items_locales_locale_parent_id" ON "_divisions_v_blocks_tabs_tabs_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_divisions_v_blocks_tabs_tabs_items_locales_parent_id_idx" ON "_divisions_v_blocks_tabs_tabs_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_divisions_v_blocks_tabs_tabs_order_idx" ON "_divisions_v_blocks_tabs_tabs" USING btree ("_order");
  CREATE INDEX "_divisions_v_blocks_tabs_tabs_parent_id_idx" ON "_divisions_v_blocks_tabs_tabs" USING btree ("_parent_id");
  CREATE INDEX "_divisions_v_blocks_tabs_tabs_image_idx" ON "_divisions_v_blocks_tabs_tabs" USING btree ("image_id");
  CREATE UNIQUE INDEX "_divisions_v_blocks_tabs_tabs_locales_locale_parent_id_uniqu" ON "_divisions_v_blocks_tabs_tabs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_divisions_v_blocks_tabs_tabs_locales_parent_id_idx" ON "_divisions_v_blocks_tabs_tabs_locales" USING btree ("_parent_id");
  CREATE INDEX "_divisions_v_blocks_tabs_order_idx" ON "_divisions_v_blocks_tabs" USING btree ("_order");
  CREATE INDEX "_divisions_v_blocks_tabs_parent_id_idx" ON "_divisions_v_blocks_tabs" USING btree ("_parent_id");
  CREATE INDEX "_divisions_v_blocks_tabs_path_idx" ON "_divisions_v_blocks_tabs" USING btree ("_path");
  CREATE UNIQUE INDEX "_divisions_v_blocks_tabs_locales_locale_parent_id_unique" ON "_divisions_v_blocks_tabs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_divisions_v_blocks_tabs_locales_parent_id_idx" ON "_divisions_v_blocks_tabs_locales" USING btree ("_parent_id");
  CREATE INDEX "_divisions_v_blocks_comparison_rows_order_idx" ON "_divisions_v_blocks_comparison_rows" USING btree ("_order");
  CREATE INDEX "_divisions_v_blocks_comparison_rows_parent_id_idx" ON "_divisions_v_blocks_comparison_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_divisions_v_blocks_comparison_rows_locales_locale_parent_id" ON "_divisions_v_blocks_comparison_rows_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_divisions_v_blocks_comparison_rows_locales_parent_id_idx" ON "_divisions_v_blocks_comparison_rows_locales" USING btree ("_parent_id");
  CREATE INDEX "_divisions_v_blocks_comparison_order_idx" ON "_divisions_v_blocks_comparison" USING btree ("_order");
  CREATE INDEX "_divisions_v_blocks_comparison_parent_id_idx" ON "_divisions_v_blocks_comparison" USING btree ("_parent_id");
  CREATE INDEX "_divisions_v_blocks_comparison_path_idx" ON "_divisions_v_blocks_comparison" USING btree ("_path");
  CREATE UNIQUE INDEX "_divisions_v_blocks_comparison_locales_locale_parent_id_uniq" ON "_divisions_v_blocks_comparison_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_divisions_v_blocks_comparison_locales_parent_id_idx" ON "_divisions_v_blocks_comparison_locales" USING btree ("_parent_id");
  CREATE INDEX "_divisions_v_blocks_faq_items_order_idx" ON "_divisions_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_divisions_v_blocks_faq_items_parent_id_idx" ON "_divisions_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_divisions_v_blocks_faq_items_locales_locale_parent_id_uniqu" ON "_divisions_v_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_divisions_v_blocks_faq_items_locales_parent_id_idx" ON "_divisions_v_blocks_faq_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_divisions_v_blocks_faq_order_idx" ON "_divisions_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_divisions_v_blocks_faq_parent_id_idx" ON "_divisions_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_divisions_v_blocks_faq_path_idx" ON "_divisions_v_blocks_faq" USING btree ("_path");
  CREATE UNIQUE INDEX "_divisions_v_blocks_faq_locales_locale_parent_id_unique" ON "_divisions_v_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_divisions_v_blocks_faq_locales_parent_id_idx" ON "_divisions_v_blocks_faq_locales" USING btree ("_parent_id");
  CREATE INDEX "_divisions_v_blocks_downloads_order_idx" ON "_divisions_v_blocks_downloads" USING btree ("_order");
  CREATE INDEX "_divisions_v_blocks_downloads_parent_id_idx" ON "_divisions_v_blocks_downloads" USING btree ("_parent_id");
  CREATE INDEX "_divisions_v_blocks_downloads_path_idx" ON "_divisions_v_blocks_downloads" USING btree ("_path");
  CREATE UNIQUE INDEX "_divisions_v_blocks_downloads_locales_locale_parent_id_uniqu" ON "_divisions_v_blocks_downloads_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_divisions_v_blocks_downloads_locales_parent_id_idx" ON "_divisions_v_blocks_downloads_locales" USING btree ("_parent_id");
  CREATE INDEX "_divisions_v_blocks_team_order_idx" ON "_divisions_v_blocks_team" USING btree ("_order");
  CREATE INDEX "_divisions_v_blocks_team_parent_id_idx" ON "_divisions_v_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "_divisions_v_blocks_team_path_idx" ON "_divisions_v_blocks_team" USING btree ("_path");
  CREATE UNIQUE INDEX "_divisions_v_blocks_team_locales_locale_parent_id_unique" ON "_divisions_v_blocks_team_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_divisions_v_blocks_team_locales_parent_id_idx" ON "_divisions_v_blocks_team_locales" USING btree ("_parent_id");
  CREATE INDEX "_divisions_v_blocks_media_block_order_idx" ON "_divisions_v_blocks_media_block" USING btree ("_order");
  CREATE INDEX "_divisions_v_blocks_media_block_parent_id_idx" ON "_divisions_v_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "_divisions_v_blocks_media_block_path_idx" ON "_divisions_v_blocks_media_block" USING btree ("_path");
  CREATE INDEX "_divisions_v_blocks_media_block_media_idx" ON "_divisions_v_blocks_media_block" USING btree ("media_id");
  CREATE UNIQUE INDEX "_divisions_v_blocks_media_block_locales_locale_parent_id_uni" ON "_divisions_v_blocks_media_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_divisions_v_blocks_media_block_locales_parent_id_idx" ON "_divisions_v_blocks_media_block_locales" USING btree ("_parent_id");
  CREATE INDEX "_divisions_v_blocks_image_text_links_order_idx" ON "_divisions_v_blocks_image_text_links" USING btree ("_order");
  CREATE INDEX "_divisions_v_blocks_image_text_links_parent_id_idx" ON "_divisions_v_blocks_image_text_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_divisions_v_blocks_image_text_links_locales_locale_parent_i" ON "_divisions_v_blocks_image_text_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_divisions_v_blocks_image_text_links_locales_parent_id_idx" ON "_divisions_v_blocks_image_text_links_locales" USING btree ("_parent_id");
  CREATE INDEX "_divisions_v_blocks_image_text_order_idx" ON "_divisions_v_blocks_image_text" USING btree ("_order");
  CREATE INDEX "_divisions_v_blocks_image_text_parent_id_idx" ON "_divisions_v_blocks_image_text" USING btree ("_parent_id");
  CREATE INDEX "_divisions_v_blocks_image_text_path_idx" ON "_divisions_v_blocks_image_text" USING btree ("_path");
  CREATE INDEX "_divisions_v_blocks_image_text_media_idx" ON "_divisions_v_blocks_image_text" USING btree ("media_id");
  CREATE UNIQUE INDEX "_divisions_v_blocks_image_text_locales_locale_parent_id_uniq" ON "_divisions_v_blocks_image_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_divisions_v_blocks_image_text_locales_parent_id_idx" ON "_divisions_v_blocks_image_text_locales" USING btree ("_parent_id");
  CREATE INDEX "_divisions_v_blocks_form_block_order_idx" ON "_divisions_v_blocks_form_block" USING btree ("_order");
  CREATE INDEX "_divisions_v_blocks_form_block_parent_id_idx" ON "_divisions_v_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX "_divisions_v_blocks_form_block_path_idx" ON "_divisions_v_blocks_form_block" USING btree ("_path");
  CREATE INDEX "_divisions_v_blocks_form_block_form_idx" ON "_divisions_v_blocks_form_block" USING btree ("form_id");
  CREATE UNIQUE INDEX "_divisions_v_blocks_form_block_locales_locale_parent_id_uniq" ON "_divisions_v_blocks_form_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_divisions_v_blocks_form_block_locales_parent_id_idx" ON "_divisions_v_blocks_form_block_locales" USING btree ("_parent_id");
  CREATE INDEX "_divisions_v_blocks_projects_order_idx" ON "_divisions_v_blocks_projects" USING btree ("_order");
  CREATE INDEX "_divisions_v_blocks_projects_parent_id_idx" ON "_divisions_v_blocks_projects" USING btree ("_parent_id");
  CREATE INDEX "_divisions_v_blocks_projects_path_idx" ON "_divisions_v_blocks_projects" USING btree ("_path");
  CREATE UNIQUE INDEX "_divisions_v_blocks_projects_locales_locale_parent_id_unique" ON "_divisions_v_blocks_projects_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_divisions_v_blocks_projects_locales_parent_id_idx" ON "_divisions_v_blocks_projects_locales" USING btree ("_parent_id");
  CREATE INDEX "_divisions_v_blocks_jobs_order_idx" ON "_divisions_v_blocks_jobs" USING btree ("_order");
  CREATE INDEX "_divisions_v_blocks_jobs_parent_id_idx" ON "_divisions_v_blocks_jobs" USING btree ("_parent_id");
  CREATE INDEX "_divisions_v_blocks_jobs_path_idx" ON "_divisions_v_blocks_jobs" USING btree ("_path");
  CREATE UNIQUE INDEX "_divisions_v_blocks_jobs_locales_locale_parent_id_unique" ON "_divisions_v_blocks_jobs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_divisions_v_blocks_jobs_locales_parent_id_idx" ON "_divisions_v_blocks_jobs_locales" USING btree ("_parent_id");
  CREATE INDEX "_divisions_v_blocks_list_panel_items_order_idx" ON "_divisions_v_blocks_list_panel_items" USING btree ("_order");
  CREATE INDEX "_divisions_v_blocks_list_panel_items_parent_id_idx" ON "_divisions_v_blocks_list_panel_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_divisions_v_blocks_list_panel_items_locales_locale_parent_i" ON "_divisions_v_blocks_list_panel_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_divisions_v_blocks_list_panel_items_locales_parent_id_idx" ON "_divisions_v_blocks_list_panel_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_divisions_v_blocks_list_panel_order_idx" ON "_divisions_v_blocks_list_panel" USING btree ("_order");
  CREATE INDEX "_divisions_v_blocks_list_panel_parent_id_idx" ON "_divisions_v_blocks_list_panel" USING btree ("_parent_id");
  CREATE INDEX "_divisions_v_blocks_list_panel_path_idx" ON "_divisions_v_blocks_list_panel" USING btree ("_path");
  CREATE UNIQUE INDEX "_divisions_v_blocks_list_panel_locales_locale_parent_id_uniq" ON "_divisions_v_blocks_list_panel_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_divisions_v_blocks_list_panel_locales_parent_id_idx" ON "_divisions_v_blocks_list_panel_locales" USING btree ("_parent_id");
  CREATE INDEX "_divisions_v_blocks_rfq_card_order_idx" ON "_divisions_v_blocks_rfq_card" USING btree ("_order");
  CREATE INDEX "_divisions_v_blocks_rfq_card_parent_id_idx" ON "_divisions_v_blocks_rfq_card" USING btree ("_parent_id");
  CREATE INDEX "_divisions_v_blocks_rfq_card_path_idx" ON "_divisions_v_blocks_rfq_card" USING btree ("_path");
  CREATE UNIQUE INDEX "_divisions_v_blocks_rfq_card_locales_locale_parent_id_unique" ON "_divisions_v_blocks_rfq_card_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_divisions_v_blocks_rfq_card_locales_parent_id_idx" ON "_divisions_v_blocks_rfq_card_locales" USING btree ("_parent_id");
  CREATE INDEX "_divisions_v_blocks_reusable_order_idx" ON "_divisions_v_blocks_reusable" USING btree ("_order");
  CREATE INDEX "_divisions_v_blocks_reusable_parent_id_idx" ON "_divisions_v_blocks_reusable" USING btree ("_parent_id");
  CREATE INDEX "_divisions_v_blocks_reusable_path_idx" ON "_divisions_v_blocks_reusable" USING btree ("_path");
  CREATE INDEX "_divisions_v_blocks_reusable_section_idx" ON "_divisions_v_blocks_reusable" USING btree ("section_id");
  CREATE INDEX "_divisions_v_parent_idx" ON "_divisions_v" USING btree ("parent_id");
  CREATE INDEX "_divisions_v_version_version_card_image_idx" ON "_divisions_v" USING btree ("version_card_image_id");
  CREATE INDEX "_divisions_v_version_hero_version_hero_media_idx" ON "_divisions_v" USING btree ("version_hero_media_id");
  CREATE INDEX "_divisions_v_version_version_slug_idx" ON "_divisions_v" USING btree ("version_slug");
  CREATE INDEX "_divisions_v_version_version_updated_at_idx" ON "_divisions_v" USING btree ("version_updated_at");
  CREATE INDEX "_divisions_v_version_version_created_at_idx" ON "_divisions_v" USING btree ("version_created_at");
  CREATE INDEX "_divisions_v_version_version__status_idx" ON "_divisions_v" USING btree ("version__status");
  CREATE INDEX "_divisions_v_created_at_idx" ON "_divisions_v" USING btree ("created_at");
  CREATE INDEX "_divisions_v_updated_at_idx" ON "_divisions_v" USING btree ("updated_at");
  CREATE INDEX "_divisions_v_snapshot_idx" ON "_divisions_v" USING btree ("snapshot");
  CREATE INDEX "_divisions_v_published_locale_idx" ON "_divisions_v" USING btree ("published_locale");
  CREATE INDEX "_divisions_v_latest_idx" ON "_divisions_v" USING btree ("latest");
  CREATE INDEX "_divisions_v_autosave_idx" ON "_divisions_v" USING btree ("autosave");
  CREATE INDEX "_divisions_v_version_meta_version_meta_image_idx" ON "_divisions_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_divisions_v_locales_locale_parent_id_unique" ON "_divisions_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_divisions_v_locales_parent_id_idx" ON "_divisions_v_locales" USING btree ("_parent_id");
  CREATE INDEX "_divisions_v_rels_order_idx" ON "_divisions_v_rels" USING btree ("order");
  CREATE INDEX "_divisions_v_rels_parent_idx" ON "_divisions_v_rels" USING btree ("parent_id");
  CREATE INDEX "_divisions_v_rels_path_idx" ON "_divisions_v_rels" USING btree ("path");
  CREATE INDEX "_divisions_v_rels_pages_id_idx" ON "_divisions_v_rels" USING btree ("pages_id");
  CREATE INDEX "_divisions_v_rels_divisions_id_idx" ON "_divisions_v_rels" USING btree ("divisions_id");
  CREATE INDEX "_divisions_v_rels_projects_id_idx" ON "_divisions_v_rels" USING btree ("projects_id");
  CREATE INDEX "_divisions_v_rels_job_openings_id_idx" ON "_divisions_v_rels" USING btree ("job_openings_id");
  CREATE INDEX "_divisions_v_rels_news_id_idx" ON "_divisions_v_rels" USING btree ("news_id");
  CREATE INDEX "_divisions_v_rels_partners_id_idx" ON "_divisions_v_rels" USING btree ("partners_id");
  CREATE INDEX "_divisions_v_rels_documents_id_idx" ON "_divisions_v_rels" USING btree ("documents_id");
  CREATE INDEX "_divisions_v_rels_team_members_id_idx" ON "_divisions_v_rels" USING btree ("team_members_id");
  CREATE INDEX "projects_metrics_order_idx" ON "projects_metrics" USING btree ("_order");
  CREATE INDEX "projects_metrics_parent_id_idx" ON "projects_metrics" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "projects_metrics_locales_locale_parent_id_unique" ON "projects_metrics_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_metrics_locales_parent_id_idx" ON "projects_metrics_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_cover_image_idx" ON "projects" USING btree ("cover_image_id");
  CREATE UNIQUE INDEX "projects_slug_idx" ON "projects" USING btree ("slug");
  CREATE INDEX "projects_updated_at_idx" ON "projects" USING btree ("updated_at");
  CREATE INDEX "projects_created_at_idx" ON "projects" USING btree ("created_at");
  CREATE INDEX "projects__status_idx" ON "projects" USING btree ("_status");
  CREATE INDEX "projects_meta_meta_image_idx" ON "projects_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "projects_locales_locale_parent_id_unique" ON "projects_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_locales_parent_id_idx" ON "projects_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_rels_order_idx" ON "projects_rels" USING btree ("order");
  CREATE INDEX "projects_rels_parent_idx" ON "projects_rels" USING btree ("parent_id");
  CREATE INDEX "projects_rels_path_idx" ON "projects_rels" USING btree ("path");
  CREATE INDEX "projects_rels_divisions_id_idx" ON "projects_rels" USING btree ("divisions_id");
  CREATE INDEX "projects_rels_media_id_idx" ON "projects_rels" USING btree ("media_id");
  CREATE INDEX "_projects_v_version_metrics_order_idx" ON "_projects_v_version_metrics" USING btree ("_order");
  CREATE INDEX "_projects_v_version_metrics_parent_id_idx" ON "_projects_v_version_metrics" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_projects_v_version_metrics_locales_locale_parent_id_unique" ON "_projects_v_version_metrics_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_version_metrics_locales_parent_id_idx" ON "_projects_v_version_metrics_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_parent_idx" ON "_projects_v" USING btree ("parent_id");
  CREATE INDEX "_projects_v_version_version_cover_image_idx" ON "_projects_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_projects_v_version_version_slug_idx" ON "_projects_v" USING btree ("version_slug");
  CREATE INDEX "_projects_v_version_version_updated_at_idx" ON "_projects_v" USING btree ("version_updated_at");
  CREATE INDEX "_projects_v_version_version_created_at_idx" ON "_projects_v" USING btree ("version_created_at");
  CREATE INDEX "_projects_v_version_version__status_idx" ON "_projects_v" USING btree ("version__status");
  CREATE INDEX "_projects_v_created_at_idx" ON "_projects_v" USING btree ("created_at");
  CREATE INDEX "_projects_v_updated_at_idx" ON "_projects_v" USING btree ("updated_at");
  CREATE INDEX "_projects_v_snapshot_idx" ON "_projects_v" USING btree ("snapshot");
  CREATE INDEX "_projects_v_published_locale_idx" ON "_projects_v" USING btree ("published_locale");
  CREATE INDEX "_projects_v_latest_idx" ON "_projects_v" USING btree ("latest");
  CREATE INDEX "_projects_v_autosave_idx" ON "_projects_v" USING btree ("autosave");
  CREATE INDEX "_projects_v_version_meta_version_meta_image_idx" ON "_projects_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_projects_v_locales_locale_parent_id_unique" ON "_projects_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_locales_parent_id_idx" ON "_projects_v_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_rels_order_idx" ON "_projects_v_rels" USING btree ("order");
  CREATE INDEX "_projects_v_rels_parent_idx" ON "_projects_v_rels" USING btree ("parent_id");
  CREATE INDEX "_projects_v_rels_path_idx" ON "_projects_v_rels" USING btree ("path");
  CREATE INDEX "_projects_v_rels_divisions_id_idx" ON "_projects_v_rels" USING btree ("divisions_id");
  CREATE INDEX "_projects_v_rels_media_id_idx" ON "_projects_v_rels" USING btree ("media_id");
  CREATE INDEX "news_cover_image_idx" ON "news" USING btree ("cover_image_id");
  CREATE INDEX "news_author_idx" ON "news" USING btree ("author_id");
  CREATE UNIQUE INDEX "news_slug_idx" ON "news" USING btree ("slug");
  CREATE INDEX "news_updated_at_idx" ON "news" USING btree ("updated_at");
  CREATE INDEX "news_created_at_idx" ON "news" USING btree ("created_at");
  CREATE INDEX "news__status_idx" ON "news" USING btree ("_status");
  CREATE INDEX "news_meta_meta_image_idx" ON "news_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "news_locales_locale_parent_id_unique" ON "news_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "news_locales_parent_id_idx" ON "news_locales" USING btree ("_parent_id");
  CREATE INDEX "_news_v_parent_idx" ON "_news_v" USING btree ("parent_id");
  CREATE INDEX "_news_v_version_version_cover_image_idx" ON "_news_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_news_v_version_version_author_idx" ON "_news_v" USING btree ("version_author_id");
  CREATE INDEX "_news_v_version_version_slug_idx" ON "_news_v" USING btree ("version_slug");
  CREATE INDEX "_news_v_version_version_updated_at_idx" ON "_news_v" USING btree ("version_updated_at");
  CREATE INDEX "_news_v_version_version_created_at_idx" ON "_news_v" USING btree ("version_created_at");
  CREATE INDEX "_news_v_version_version__status_idx" ON "_news_v" USING btree ("version__status");
  CREATE INDEX "_news_v_created_at_idx" ON "_news_v" USING btree ("created_at");
  CREATE INDEX "_news_v_updated_at_idx" ON "_news_v" USING btree ("updated_at");
  CREATE INDEX "_news_v_snapshot_idx" ON "_news_v" USING btree ("snapshot");
  CREATE INDEX "_news_v_published_locale_idx" ON "_news_v" USING btree ("published_locale");
  CREATE INDEX "_news_v_latest_idx" ON "_news_v" USING btree ("latest");
  CREATE INDEX "_news_v_autosave_idx" ON "_news_v" USING btree ("autosave");
  CREATE INDEX "_news_v_version_meta_version_meta_image_idx" ON "_news_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_news_v_locales_locale_parent_id_unique" ON "_news_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_news_v_locales_parent_id_idx" ON "_news_v_locales" USING btree ("_parent_id");
  CREATE INDEX "partners_logo_idx" ON "partners" USING btree ("logo_id");
  CREATE INDEX "partners_updated_at_idx" ON "partners" USING btree ("updated_at");
  CREATE INDEX "partners_created_at_idx" ON "partners" USING btree ("created_at");
  CREATE INDEX "team_members_photo_idx" ON "team_members" USING btree ("photo_id");
  CREATE INDEX "team_members_updated_at_idx" ON "team_members" USING btree ("updated_at");
  CREATE INDEX "team_members_created_at_idx" ON "team_members" USING btree ("created_at");
  CREATE UNIQUE INDEX "team_members_locales_locale_parent_id_unique" ON "team_members_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "team_members_locales_parent_id_idx" ON "team_members_locales" USING btree ("_parent_id");
  CREATE INDEX "documents_updated_at_idx" ON "documents" USING btree ("updated_at");
  CREATE INDEX "documents_created_at_idx" ON "documents" USING btree ("created_at");
  CREATE UNIQUE INDEX "documents_filename_idx" ON "documents" USING btree ("filename");
  CREATE UNIQUE INDEX "documents_locales_locale_parent_id_unique" ON "documents_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "documents_locales_parent_id_idx" ON "documents_locales" USING btree ("_parent_id");
  CREATE INDEX "reusable_blocks_blocks_divisions_grid_order_idx" ON "reusable_blocks_blocks_divisions_grid" USING btree ("_order");
  CREATE INDEX "reusable_blocks_blocks_divisions_grid_parent_id_idx" ON "reusable_blocks_blocks_divisions_grid" USING btree ("_parent_id");
  CREATE INDEX "reusable_blocks_blocks_divisions_grid_path_idx" ON "reusable_blocks_blocks_divisions_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "reusable_blocks_blocks_divisions_grid_locales_locale_parent_" ON "reusable_blocks_blocks_divisions_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "reusable_blocks_blocks_divisions_grid_locales_parent_id_idx" ON "reusable_blocks_blocks_divisions_grid_locales" USING btree ("_parent_id");
  CREATE INDEX "reusable_blocks_blocks_process_steps_steps_order_idx" ON "reusable_blocks_blocks_process_steps_steps" USING btree ("_order");
  CREATE INDEX "reusable_blocks_blocks_process_steps_steps_parent_id_idx" ON "reusable_blocks_blocks_process_steps_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "reusable_blocks_blocks_process_steps_steps_locales_locale_pa" ON "reusable_blocks_blocks_process_steps_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "reusable_blocks_blocks_process_steps_steps_locales_paren_idx" ON "reusable_blocks_blocks_process_steps_steps_locales" USING btree ("_parent_id");
  CREATE INDEX "reusable_blocks_blocks_process_steps_order_idx" ON "reusable_blocks_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "reusable_blocks_blocks_process_steps_parent_id_idx" ON "reusable_blocks_blocks_process_steps" USING btree ("_parent_id");
  CREATE INDEX "reusable_blocks_blocks_process_steps_path_idx" ON "reusable_blocks_blocks_process_steps" USING btree ("_path");
  CREATE UNIQUE INDEX "reusable_blocks_blocks_process_steps_locales_locale_parent_i" ON "reusable_blocks_blocks_process_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "reusable_blocks_blocks_process_steps_locales_parent_id_idx" ON "reusable_blocks_blocks_process_steps_locales" USING btree ("_parent_id");
  CREATE INDEX "reusable_blocks_blocks_feature_cards_cards_items_order_idx" ON "reusable_blocks_blocks_feature_cards_cards_items" USING btree ("_order");
  CREATE INDEX "reusable_blocks_blocks_feature_cards_cards_items_parent_id_idx" ON "reusable_blocks_blocks_feature_cards_cards_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "reusable_blocks_blocks_feature_cards_cards_items_locales_loc" ON "reusable_blocks_blocks_feature_cards_cards_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "reusable_blocks_blocks_feature_cards_cards_items_locales_idx" ON "reusable_blocks_blocks_feature_cards_cards_items_locales" USING btree ("_parent_id");
  CREATE INDEX "reusable_blocks_blocks_feature_cards_cards_order_idx" ON "reusable_blocks_blocks_feature_cards_cards" USING btree ("_order");
  CREATE INDEX "reusable_blocks_blocks_feature_cards_cards_parent_id_idx" ON "reusable_blocks_blocks_feature_cards_cards" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "reusable_blocks_blocks_feature_cards_cards_locales_locale_pa" ON "reusable_blocks_blocks_feature_cards_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "reusable_blocks_blocks_feature_cards_cards_locales_paren_idx" ON "reusable_blocks_blocks_feature_cards_cards_locales" USING btree ("_parent_id");
  CREATE INDEX "reusable_blocks_blocks_feature_cards_order_idx" ON "reusable_blocks_blocks_feature_cards" USING btree ("_order");
  CREATE INDEX "reusable_blocks_blocks_feature_cards_parent_id_idx" ON "reusable_blocks_blocks_feature_cards" USING btree ("_parent_id");
  CREATE INDEX "reusable_blocks_blocks_feature_cards_path_idx" ON "reusable_blocks_blocks_feature_cards" USING btree ("_path");
  CREATE UNIQUE INDEX "reusable_blocks_blocks_feature_cards_locales_locale_parent_i" ON "reusable_blocks_blocks_feature_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "reusable_blocks_blocks_feature_cards_locales_parent_id_idx" ON "reusable_blocks_blocks_feature_cards_locales" USING btree ("_parent_id");
  CREATE INDEX "reusable_blocks_blocks_stats_items_order_idx" ON "reusable_blocks_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "reusable_blocks_blocks_stats_items_parent_id_idx" ON "reusable_blocks_blocks_stats_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "reusable_blocks_blocks_stats_items_locales_locale_parent_id_" ON "reusable_blocks_blocks_stats_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "reusable_blocks_blocks_stats_items_locales_parent_id_idx" ON "reusable_blocks_blocks_stats_items_locales" USING btree ("_parent_id");
  CREATE INDEX "reusable_blocks_blocks_stats_order_idx" ON "reusable_blocks_blocks_stats" USING btree ("_order");
  CREATE INDEX "reusable_blocks_blocks_stats_parent_id_idx" ON "reusable_blocks_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "reusable_blocks_blocks_stats_path_idx" ON "reusable_blocks_blocks_stats" USING btree ("_path");
  CREATE INDEX "reusable_blocks_blocks_logos_order_idx" ON "reusable_blocks_blocks_logos" USING btree ("_order");
  CREATE INDEX "reusable_blocks_blocks_logos_parent_id_idx" ON "reusable_blocks_blocks_logos" USING btree ("_parent_id");
  CREATE INDEX "reusable_blocks_blocks_logos_path_idx" ON "reusable_blocks_blocks_logos" USING btree ("_path");
  CREATE UNIQUE INDEX "reusable_blocks_blocks_logos_locales_locale_parent_id_unique" ON "reusable_blocks_blocks_logos_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "reusable_blocks_blocks_logos_locales_parent_id_idx" ON "reusable_blocks_blocks_logos_locales" USING btree ("_parent_id");
  CREATE INDEX "reusable_blocks_blocks_cta_links_order_idx" ON "reusable_blocks_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "reusable_blocks_blocks_cta_links_parent_id_idx" ON "reusable_blocks_blocks_cta_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "reusable_blocks_blocks_cta_links_locales_locale_parent_id_un" ON "reusable_blocks_blocks_cta_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "reusable_blocks_blocks_cta_links_locales_parent_id_idx" ON "reusable_blocks_blocks_cta_links_locales" USING btree ("_parent_id");
  CREATE INDEX "reusable_blocks_blocks_cta_order_idx" ON "reusable_blocks_blocks_cta" USING btree ("_order");
  CREATE INDEX "reusable_blocks_blocks_cta_parent_id_idx" ON "reusable_blocks_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "reusable_blocks_blocks_cta_path_idx" ON "reusable_blocks_blocks_cta" USING btree ("_path");
  CREATE UNIQUE INDEX "reusable_blocks_blocks_cta_locales_locale_parent_id_unique" ON "reusable_blocks_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "reusable_blocks_blocks_cta_locales_parent_id_idx" ON "reusable_blocks_blocks_cta_locales" USING btree ("_parent_id");
  CREATE INDEX "reusable_blocks_blocks_content_order_idx" ON "reusable_blocks_blocks_content" USING btree ("_order");
  CREATE INDEX "reusable_blocks_blocks_content_parent_id_idx" ON "reusable_blocks_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "reusable_blocks_blocks_content_path_idx" ON "reusable_blocks_blocks_content" USING btree ("_path");
  CREATE UNIQUE INDEX "reusable_blocks_blocks_content_locales_locale_parent_id_uniq" ON "reusable_blocks_blocks_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "reusable_blocks_blocks_content_locales_parent_id_idx" ON "reusable_blocks_blocks_content_locales" USING btree ("_parent_id");
  CREATE INDEX "reusable_blocks_blocks_chips_items_order_idx" ON "reusable_blocks_blocks_chips_items" USING btree ("_order");
  CREATE INDEX "reusable_blocks_blocks_chips_items_parent_id_idx" ON "reusable_blocks_blocks_chips_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "reusable_blocks_blocks_chips_items_locales_locale_parent_id_" ON "reusable_blocks_blocks_chips_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "reusable_blocks_blocks_chips_items_locales_parent_id_idx" ON "reusable_blocks_blocks_chips_items_locales" USING btree ("_parent_id");
  CREATE INDEX "reusable_blocks_blocks_chips_order_idx" ON "reusable_blocks_blocks_chips" USING btree ("_order");
  CREATE INDEX "reusable_blocks_blocks_chips_parent_id_idx" ON "reusable_blocks_blocks_chips" USING btree ("_parent_id");
  CREATE INDEX "reusable_blocks_blocks_chips_path_idx" ON "reusable_blocks_blocks_chips" USING btree ("_path");
  CREATE UNIQUE INDEX "reusable_blocks_blocks_chips_locales_locale_parent_id_unique" ON "reusable_blocks_blocks_chips_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "reusable_blocks_blocks_chips_locales_parent_id_idx" ON "reusable_blocks_blocks_chips_locales" USING btree ("_parent_id");
  CREATE INDEX "reusable_blocks_blocks_tabs_tabs_items_order_idx" ON "reusable_blocks_blocks_tabs_tabs_items" USING btree ("_order");
  CREATE INDEX "reusable_blocks_blocks_tabs_tabs_items_parent_id_idx" ON "reusable_blocks_blocks_tabs_tabs_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "reusable_blocks_blocks_tabs_tabs_items_locales_locale_parent" ON "reusable_blocks_blocks_tabs_tabs_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "reusable_blocks_blocks_tabs_tabs_items_locales_parent_id_idx" ON "reusable_blocks_blocks_tabs_tabs_items_locales" USING btree ("_parent_id");
  CREATE INDEX "reusable_blocks_blocks_tabs_tabs_order_idx" ON "reusable_blocks_blocks_tabs_tabs" USING btree ("_order");
  CREATE INDEX "reusable_blocks_blocks_tabs_tabs_parent_id_idx" ON "reusable_blocks_blocks_tabs_tabs" USING btree ("_parent_id");
  CREATE INDEX "reusable_blocks_blocks_tabs_tabs_image_idx" ON "reusable_blocks_blocks_tabs_tabs" USING btree ("image_id");
  CREATE UNIQUE INDEX "reusable_blocks_blocks_tabs_tabs_locales_locale_parent_id_un" ON "reusable_blocks_blocks_tabs_tabs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "reusable_blocks_blocks_tabs_tabs_locales_parent_id_idx" ON "reusable_blocks_blocks_tabs_tabs_locales" USING btree ("_parent_id");
  CREATE INDEX "reusable_blocks_blocks_tabs_order_idx" ON "reusable_blocks_blocks_tabs" USING btree ("_order");
  CREATE INDEX "reusable_blocks_blocks_tabs_parent_id_idx" ON "reusable_blocks_blocks_tabs" USING btree ("_parent_id");
  CREATE INDEX "reusable_blocks_blocks_tabs_path_idx" ON "reusable_blocks_blocks_tabs" USING btree ("_path");
  CREATE UNIQUE INDEX "reusable_blocks_blocks_tabs_locales_locale_parent_id_unique" ON "reusable_blocks_blocks_tabs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "reusable_blocks_blocks_tabs_locales_parent_id_idx" ON "reusable_blocks_blocks_tabs_locales" USING btree ("_parent_id");
  CREATE INDEX "reusable_blocks_blocks_comparison_rows_order_idx" ON "reusable_blocks_blocks_comparison_rows" USING btree ("_order");
  CREATE INDEX "reusable_blocks_blocks_comparison_rows_parent_id_idx" ON "reusable_blocks_blocks_comparison_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "reusable_blocks_blocks_comparison_rows_locales_locale_parent" ON "reusable_blocks_blocks_comparison_rows_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "reusable_blocks_blocks_comparison_rows_locales_parent_id_idx" ON "reusable_blocks_blocks_comparison_rows_locales" USING btree ("_parent_id");
  CREATE INDEX "reusable_blocks_blocks_comparison_order_idx" ON "reusable_blocks_blocks_comparison" USING btree ("_order");
  CREATE INDEX "reusable_blocks_blocks_comparison_parent_id_idx" ON "reusable_blocks_blocks_comparison" USING btree ("_parent_id");
  CREATE INDEX "reusable_blocks_blocks_comparison_path_idx" ON "reusable_blocks_blocks_comparison" USING btree ("_path");
  CREATE UNIQUE INDEX "reusable_blocks_blocks_comparison_locales_locale_parent_id_u" ON "reusable_blocks_blocks_comparison_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "reusable_blocks_blocks_comparison_locales_parent_id_idx" ON "reusable_blocks_blocks_comparison_locales" USING btree ("_parent_id");
  CREATE INDEX "reusable_blocks_blocks_faq_items_order_idx" ON "reusable_blocks_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "reusable_blocks_blocks_faq_items_parent_id_idx" ON "reusable_blocks_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "reusable_blocks_blocks_faq_items_locales_locale_parent_id_un" ON "reusable_blocks_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "reusable_blocks_blocks_faq_items_locales_parent_id_idx" ON "reusable_blocks_blocks_faq_items_locales" USING btree ("_parent_id");
  CREATE INDEX "reusable_blocks_blocks_faq_order_idx" ON "reusable_blocks_blocks_faq" USING btree ("_order");
  CREATE INDEX "reusable_blocks_blocks_faq_parent_id_idx" ON "reusable_blocks_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "reusable_blocks_blocks_faq_path_idx" ON "reusable_blocks_blocks_faq" USING btree ("_path");
  CREATE UNIQUE INDEX "reusable_blocks_blocks_faq_locales_locale_parent_id_unique" ON "reusable_blocks_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "reusable_blocks_blocks_faq_locales_parent_id_idx" ON "reusable_blocks_blocks_faq_locales" USING btree ("_parent_id");
  CREATE INDEX "reusable_blocks_blocks_downloads_order_idx" ON "reusable_blocks_blocks_downloads" USING btree ("_order");
  CREATE INDEX "reusable_blocks_blocks_downloads_parent_id_idx" ON "reusable_blocks_blocks_downloads" USING btree ("_parent_id");
  CREATE INDEX "reusable_blocks_blocks_downloads_path_idx" ON "reusable_blocks_blocks_downloads" USING btree ("_path");
  CREATE UNIQUE INDEX "reusable_blocks_blocks_downloads_locales_locale_parent_id_un" ON "reusable_blocks_blocks_downloads_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "reusable_blocks_blocks_downloads_locales_parent_id_idx" ON "reusable_blocks_blocks_downloads_locales" USING btree ("_parent_id");
  CREATE INDEX "reusable_blocks_blocks_team_order_idx" ON "reusable_blocks_blocks_team" USING btree ("_order");
  CREATE INDEX "reusable_blocks_blocks_team_parent_id_idx" ON "reusable_blocks_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "reusable_blocks_blocks_team_path_idx" ON "reusable_blocks_blocks_team" USING btree ("_path");
  CREATE UNIQUE INDEX "reusable_blocks_blocks_team_locales_locale_parent_id_unique" ON "reusable_blocks_blocks_team_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "reusable_blocks_blocks_team_locales_parent_id_idx" ON "reusable_blocks_blocks_team_locales" USING btree ("_parent_id");
  CREATE INDEX "reusable_blocks_blocks_media_block_order_idx" ON "reusable_blocks_blocks_media_block" USING btree ("_order");
  CREATE INDEX "reusable_blocks_blocks_media_block_parent_id_idx" ON "reusable_blocks_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "reusable_blocks_blocks_media_block_path_idx" ON "reusable_blocks_blocks_media_block" USING btree ("_path");
  CREATE INDEX "reusable_blocks_blocks_media_block_media_idx" ON "reusable_blocks_blocks_media_block" USING btree ("media_id");
  CREATE UNIQUE INDEX "reusable_blocks_blocks_media_block_locales_locale_parent_id_" ON "reusable_blocks_blocks_media_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "reusable_blocks_blocks_media_block_locales_parent_id_idx" ON "reusable_blocks_blocks_media_block_locales" USING btree ("_parent_id");
  CREATE INDEX "reusable_blocks_blocks_image_text_links_order_idx" ON "reusable_blocks_blocks_image_text_links" USING btree ("_order");
  CREATE INDEX "reusable_blocks_blocks_image_text_links_parent_id_idx" ON "reusable_blocks_blocks_image_text_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "reusable_blocks_blocks_image_text_links_locales_locale_paren" ON "reusable_blocks_blocks_image_text_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "reusable_blocks_blocks_image_text_links_locales_parent_i_idx" ON "reusable_blocks_blocks_image_text_links_locales" USING btree ("_parent_id");
  CREATE INDEX "reusable_blocks_blocks_image_text_order_idx" ON "reusable_blocks_blocks_image_text" USING btree ("_order");
  CREATE INDEX "reusable_blocks_blocks_image_text_parent_id_idx" ON "reusable_blocks_blocks_image_text" USING btree ("_parent_id");
  CREATE INDEX "reusable_blocks_blocks_image_text_path_idx" ON "reusable_blocks_blocks_image_text" USING btree ("_path");
  CREATE INDEX "reusable_blocks_blocks_image_text_media_idx" ON "reusable_blocks_blocks_image_text" USING btree ("media_id");
  CREATE UNIQUE INDEX "reusable_blocks_blocks_image_text_locales_locale_parent_id_u" ON "reusable_blocks_blocks_image_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "reusable_blocks_blocks_image_text_locales_parent_id_idx" ON "reusable_blocks_blocks_image_text_locales" USING btree ("_parent_id");
  CREATE INDEX "reusable_blocks_blocks_form_block_order_idx" ON "reusable_blocks_blocks_form_block" USING btree ("_order");
  CREATE INDEX "reusable_blocks_blocks_form_block_parent_id_idx" ON "reusable_blocks_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX "reusable_blocks_blocks_form_block_path_idx" ON "reusable_blocks_blocks_form_block" USING btree ("_path");
  CREATE INDEX "reusable_blocks_blocks_form_block_form_idx" ON "reusable_blocks_blocks_form_block" USING btree ("form_id");
  CREATE UNIQUE INDEX "reusable_blocks_blocks_form_block_locales_locale_parent_id_u" ON "reusable_blocks_blocks_form_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "reusable_blocks_blocks_form_block_locales_parent_id_idx" ON "reusable_blocks_blocks_form_block_locales" USING btree ("_parent_id");
  CREATE INDEX "reusable_blocks_blocks_projects_order_idx" ON "reusable_blocks_blocks_projects" USING btree ("_order");
  CREATE INDEX "reusable_blocks_blocks_projects_parent_id_idx" ON "reusable_blocks_blocks_projects" USING btree ("_parent_id");
  CREATE INDEX "reusable_blocks_blocks_projects_path_idx" ON "reusable_blocks_blocks_projects" USING btree ("_path");
  CREATE UNIQUE INDEX "reusable_blocks_blocks_projects_locales_locale_parent_id_uni" ON "reusable_blocks_blocks_projects_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "reusable_blocks_blocks_projects_locales_parent_id_idx" ON "reusable_blocks_blocks_projects_locales" USING btree ("_parent_id");
  CREATE INDEX "reusable_blocks_blocks_jobs_order_idx" ON "reusable_blocks_blocks_jobs" USING btree ("_order");
  CREATE INDEX "reusable_blocks_blocks_jobs_parent_id_idx" ON "reusable_blocks_blocks_jobs" USING btree ("_parent_id");
  CREATE INDEX "reusable_blocks_blocks_jobs_path_idx" ON "reusable_blocks_blocks_jobs" USING btree ("_path");
  CREATE UNIQUE INDEX "reusable_blocks_blocks_jobs_locales_locale_parent_id_unique" ON "reusable_blocks_blocks_jobs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "reusable_blocks_blocks_jobs_locales_parent_id_idx" ON "reusable_blocks_blocks_jobs_locales" USING btree ("_parent_id");
  CREATE INDEX "reusable_blocks_blocks_list_panel_items_order_idx" ON "reusable_blocks_blocks_list_panel_items" USING btree ("_order");
  CREATE INDEX "reusable_blocks_blocks_list_panel_items_parent_id_idx" ON "reusable_blocks_blocks_list_panel_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "reusable_blocks_blocks_list_panel_items_locales_locale_paren" ON "reusable_blocks_blocks_list_panel_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "reusable_blocks_blocks_list_panel_items_locales_parent_i_idx" ON "reusable_blocks_blocks_list_panel_items_locales" USING btree ("_parent_id");
  CREATE INDEX "reusable_blocks_blocks_list_panel_order_idx" ON "reusable_blocks_blocks_list_panel" USING btree ("_order");
  CREATE INDEX "reusable_blocks_blocks_list_panel_parent_id_idx" ON "reusable_blocks_blocks_list_panel" USING btree ("_parent_id");
  CREATE INDEX "reusable_blocks_blocks_list_panel_path_idx" ON "reusable_blocks_blocks_list_panel" USING btree ("_path");
  CREATE UNIQUE INDEX "reusable_blocks_blocks_list_panel_locales_locale_parent_id_u" ON "reusable_blocks_blocks_list_panel_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "reusable_blocks_blocks_list_panel_locales_parent_id_idx" ON "reusable_blocks_blocks_list_panel_locales" USING btree ("_parent_id");
  CREATE INDEX "reusable_blocks_blocks_rfq_card_order_idx" ON "reusable_blocks_blocks_rfq_card" USING btree ("_order");
  CREATE INDEX "reusable_blocks_blocks_rfq_card_parent_id_idx" ON "reusable_blocks_blocks_rfq_card" USING btree ("_parent_id");
  CREATE INDEX "reusable_blocks_blocks_rfq_card_path_idx" ON "reusable_blocks_blocks_rfq_card" USING btree ("_path");
  CREATE UNIQUE INDEX "reusable_blocks_blocks_rfq_card_locales_locale_parent_id_uni" ON "reusable_blocks_blocks_rfq_card_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "reusable_blocks_blocks_rfq_card_locales_parent_id_idx" ON "reusable_blocks_blocks_rfq_card_locales" USING btree ("_parent_id");
  CREATE INDEX "reusable_blocks_updated_at_idx" ON "reusable_blocks" USING btree ("updated_at");
  CREATE INDEX "reusable_blocks_created_at_idx" ON "reusable_blocks" USING btree ("created_at");
  CREATE INDEX "reusable_blocks_rels_order_idx" ON "reusable_blocks_rels" USING btree ("order");
  CREATE INDEX "reusable_blocks_rels_parent_idx" ON "reusable_blocks_rels" USING btree ("parent_id");
  CREATE INDEX "reusable_blocks_rels_path_idx" ON "reusable_blocks_rels" USING btree ("path");
  CREATE INDEX "reusable_blocks_rels_divisions_id_idx" ON "reusable_blocks_rels" USING btree ("divisions_id");
  CREATE INDEX "reusable_blocks_rels_pages_id_idx" ON "reusable_blocks_rels" USING btree ("pages_id");
  CREATE INDEX "reusable_blocks_rels_projects_id_idx" ON "reusable_blocks_rels" USING btree ("projects_id");
  CREATE INDEX "reusable_blocks_rels_job_openings_id_idx" ON "reusable_blocks_rels" USING btree ("job_openings_id");
  CREATE INDEX "reusable_blocks_rels_news_id_idx" ON "reusable_blocks_rels" USING btree ("news_id");
  CREATE INDEX "reusable_blocks_rels_partners_id_idx" ON "reusable_blocks_rels" USING btree ("partners_id");
  CREATE INDEX "reusable_blocks_rels_documents_id_idx" ON "reusable_blocks_rels" USING btree ("documents_id");
  CREATE INDEX "reusable_blocks_rels_team_members_id_idx" ON "reusable_blocks_rels" USING btree ("team_members_id");
  CREATE INDEX "media_folder_idx" ON "media" USING btree ("folder_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE INDEX "media_sizes_og_sizes_og_filename_idx" ON "media" USING btree ("sizes_og_filename");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "media_locales_parent_id_idx" ON "media_locales" USING btree ("_parent_id");
  CREATE INDEX "form_files_updated_at_idx" ON "form_files" USING btree ("updated_at");
  CREATE INDEX "form_files_created_at_idx" ON "form_files" USING btree ("created_at");
  CREATE UNIQUE INDEX "form_files_filename_idx" ON "form_files" USING btree ("filename");
  CREATE INDEX "job_openings_responsibilities_order_idx" ON "job_openings_responsibilities" USING btree ("_order");
  CREATE INDEX "job_openings_responsibilities_parent_id_idx" ON "job_openings_responsibilities" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "job_openings_responsibilities_locales_locale_parent_id_uniqu" ON "job_openings_responsibilities_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "job_openings_responsibilities_locales_parent_id_idx" ON "job_openings_responsibilities_locales" USING btree ("_parent_id");
  CREATE INDEX "job_openings_requirements_order_idx" ON "job_openings_requirements" USING btree ("_order");
  CREATE INDEX "job_openings_requirements_parent_id_idx" ON "job_openings_requirements" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "job_openings_requirements_locales_locale_parent_id_unique" ON "job_openings_requirements_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "job_openings_requirements_locales_parent_id_idx" ON "job_openings_requirements_locales" USING btree ("_parent_id");
  CREATE INDEX "job_openings_benefits_order_idx" ON "job_openings_benefits" USING btree ("_order");
  CREATE INDEX "job_openings_benefits_parent_id_idx" ON "job_openings_benefits" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "job_openings_benefits_locales_locale_parent_id_unique" ON "job_openings_benefits_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "job_openings_benefits_locales_parent_id_idx" ON "job_openings_benefits_locales" USING btree ("_parent_id");
  CREATE INDEX "job_openings_skills_order_idx" ON "job_openings_skills" USING btree ("_order");
  CREATE INDEX "job_openings_skills_parent_id_idx" ON "job_openings_skills" USING btree ("_parent_id");
  CREATE INDEX "job_openings_certifications_order_idx" ON "job_openings_certifications" USING btree ("_order");
  CREATE INDEX "job_openings_certifications_parent_id_idx" ON "job_openings_certifications" USING btree ("_parent_id");
  CREATE INDEX "job_openings_screening_questions_order_idx" ON "job_openings_screening_questions" USING btree ("_order");
  CREATE INDEX "job_openings_screening_questions_parent_id_idx" ON "job_openings_screening_questions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "job_openings_screening_questions_locales_locale_parent_id_un" ON "job_openings_screening_questions_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "job_openings_screening_questions_locales_parent_id_idx" ON "job_openings_screening_questions_locales" USING btree ("_parent_id");
  CREATE INDEX "job_openings_notify_recipients_order_idx" ON "job_openings_notify_recipients" USING btree ("_order");
  CREATE INDEX "job_openings_notify_recipients_parent_id_idx" ON "job_openings_notify_recipients" USING btree ("_parent_id");
  CREATE INDEX "job_openings_division_idx" ON "job_openings" USING btree ("division_id");
  CREATE INDEX "job_openings_hiring_manager_idx" ON "job_openings" USING btree ("hiring_manager_id");
  CREATE INDEX "job_openings_status_idx" ON "job_openings" USING btree ("status");
  CREATE UNIQUE INDEX "job_openings_slug_idx" ON "job_openings" USING btree ("slug");
  CREATE INDEX "job_openings_updated_at_idx" ON "job_openings" USING btree ("updated_at");
  CREATE INDEX "job_openings_created_at_idx" ON "job_openings" USING btree ("created_at");
  CREATE INDEX "job_openings_meta_meta_image_idx" ON "job_openings_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "job_openings_locales_locale_parent_id_unique" ON "job_openings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "job_openings_locales_parent_id_idx" ON "job_openings_locales" USING btree ("_parent_id");
  CREATE INDEX "applications_screening_answers_order_idx" ON "applications_screening_answers" USING btree ("_order");
  CREATE INDEX "applications_screening_answers_parent_id_idx" ON "applications_screening_answers" USING btree ("_parent_id");
  CREATE INDEX "applications_notes_order_idx" ON "applications_notes" USING btree ("_order");
  CREATE INDEX "applications_notes_parent_id_idx" ON "applications_notes" USING btree ("_parent_id");
  CREATE INDEX "applications_notes_author_idx" ON "applications_notes" USING btree ("author_id");
  CREATE INDEX "applications_activity_order_idx" ON "applications_activity" USING btree ("_order");
  CREATE INDEX "applications_activity_parent_id_idx" ON "applications_activity" USING btree ("_parent_id");
  CREATE INDEX "applications_tags_order_idx" ON "applications_tags" USING btree ("order");
  CREATE INDEX "applications_tags_parent_idx" ON "applications_tags" USING btree ("parent_id");
  CREATE INDEX "applications_email_idx" ON "applications" USING btree ("email");
  CREATE INDEX "applications_resume_idx" ON "applications" USING btree ("resume_id");
  CREATE INDEX "applications_job_idx" ON "applications" USING btree ("job_id");
  CREATE INDEX "applications_stage_idx" ON "applications" USING btree ("stage");
  CREATE INDEX "applications_match_score_idx" ON "applications" USING btree ("match_score");
  CREATE INDEX "applications_assigned_to_idx" ON "applications" USING btree ("assigned_to_id");
  CREATE INDEX "applications_candidate_name_idx" ON "applications" USING btree ("candidate_name");
  CREATE INDEX "applications_updated_at_idx" ON "applications" USING btree ("updated_at");
  CREATE INDEX "applications_created_at_idx" ON "applications" USING btree ("created_at");
  CREATE INDEX "resumes_updated_at_idx" ON "resumes" USING btree ("updated_at");
  CREATE INDEX "resumes_created_at_idx" ON "resumes" USING btree ("created_at");
  CREATE UNIQUE INDEX "resumes_filename_idx" ON "resumes" USING btree ("filename");
  CREATE INDEX "vendors_regions_order_idx" ON "vendors_regions" USING btree ("order");
  CREATE INDEX "vendors_regions_parent_idx" ON "vendors_regions" USING btree ("parent_id");
  CREATE INDEX "vendors_certifications_order_idx" ON "vendors_certifications" USING btree ("order");
  CREATE INDEX "vendors_certifications_parent_idx" ON "vendors_certifications" USING btree ("parent_id");
  CREATE INDEX "vendors_references_order_idx" ON "vendors_references" USING btree ("_order");
  CREATE INDEX "vendors_references_parent_id_idx" ON "vendors_references" USING btree ("_parent_id");
  CREATE INDEX "vendors_documents_order_idx" ON "vendors_documents" USING btree ("_order");
  CREATE INDEX "vendors_documents_parent_id_idx" ON "vendors_documents" USING btree ("_parent_id");
  CREATE INDEX "vendors_documents_file_idx" ON "vendors_documents" USING btree ("file_id");
  CREATE INDEX "vendors_internal_notes_order_idx" ON "vendors_internal_notes" USING btree ("_order");
  CREATE INDEX "vendors_internal_notes_parent_id_idx" ON "vendors_internal_notes" USING btree ("_parent_id");
  CREATE INDEX "vendors_internal_notes_author_idx" ON "vendors_internal_notes" USING btree ("author_id");
  CREATE INDEX "vendors_status_history_order_idx" ON "vendors_status_history" USING btree ("_order");
  CREATE INDEX "vendors_status_history_parent_id_idx" ON "vendors_status_history" USING btree ("_parent_id");
  CREATE INDEX "vendors_sessions_order_idx" ON "vendors_sessions" USING btree ("_order");
  CREATE INDEX "vendors_sessions_parent_id_idx" ON "vendors_sessions" USING btree ("_parent_id");
  CREATE INDEX "vendors_cr_number_idx" ON "vendors" USING btree ("cr_number");
  CREATE INDEX "vendors_status_idx" ON "vendors" USING btree ("status");
  CREATE INDEX "vendors_reference_number_idx" ON "vendors" USING btree ("reference_number");
  CREATE INDEX "vendors_vendor_code_idx" ON "vendors" USING btree ("vendor_code");
  CREATE INDEX "vendors_assigned_to_idx" ON "vendors" USING btree ("assigned_to_id");
  CREATE INDEX "vendors_updated_at_idx" ON "vendors" USING btree ("updated_at");
  CREATE INDEX "vendors_created_at_idx" ON "vendors" USING btree ("created_at");
  CREATE UNIQUE INDEX "vendors_email_idx" ON "vendors" USING btree ("email");
  CREATE INDEX "vendors_texts_order_parent" ON "vendors_texts" USING btree ("order","parent_id");
  CREATE INDEX "vendors_rels_order_idx" ON "vendors_rels" USING btree ("order");
  CREATE INDEX "vendors_rels_parent_idx" ON "vendors_rels" USING btree ("parent_id");
  CREATE INDEX "vendors_rels_path_idx" ON "vendors_rels" USING btree ("path");
  CREATE INDEX "vendors_rels_divisions_id_idx" ON "vendors_rels" USING btree ("divisions_id");
  CREATE INDEX "vendor_documents_owner_idx" ON "vendor_documents" USING btree ("owner_id");
  CREATE INDEX "vendor_documents_updated_at_idx" ON "vendor_documents" USING btree ("updated_at");
  CREATE INDEX "vendor_documents_created_at_idx" ON "vendor_documents" USING btree ("created_at");
  CREATE UNIQUE INDEX "vendor_documents_filename_idx" ON "vendor_documents" USING btree ("filename");
  CREATE INDEX "users_roles_order_idx" ON "users_roles" USING btree ("order");
  CREATE INDEX "users_roles_parent_idx" ON "users_roles" USING btree ("parent_id");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "email_logs_category_idx" ON "email_logs" USING btree ("category");
  CREATE INDEX "email_logs_status_idx" ON "email_logs" USING btree ("status");
  CREATE INDEX "email_logs_updated_at_idx" ON "email_logs" USING btree ("updated_at");
  CREATE INDEX "email_logs_created_at_idx" ON "email_logs" USING btree ("created_at");
  CREATE INDEX "audit_logs_action_idx" ON "audit_logs" USING btree ("action");
  CREATE INDEX "audit_logs_collection_slug_idx" ON "audit_logs" USING btree ("collection_slug");
  CREATE INDEX "audit_logs_updated_at_idx" ON "audit_logs" USING btree ("updated_at");
  CREATE INDEX "audit_logs_created_at_idx" ON "audit_logs" USING btree ("created_at");
  CREATE UNIQUE INDEX "redirects_from_idx" ON "redirects" USING btree ("from");
  CREATE INDEX "redirects_updated_at_idx" ON "redirects" USING btree ("updated_at");
  CREATE INDEX "redirects_created_at_idx" ON "redirects" USING btree ("created_at");
  CREATE INDEX "redirects_rels_order_idx" ON "redirects_rels" USING btree ("order");
  CREATE INDEX "redirects_rels_parent_idx" ON "redirects_rels" USING btree ("parent_id");
  CREATE INDEX "redirects_rels_path_idx" ON "redirects_rels" USING btree ("path");
  CREATE INDEX "redirects_rels_pages_id_idx" ON "redirects_rels" USING btree ("pages_id");
  CREATE INDEX "redirects_rels_divisions_id_idx" ON "redirects_rels" USING btree ("divisions_id");
  CREATE INDEX "redirects_rels_projects_id_idx" ON "redirects_rels" USING btree ("projects_id");
  CREATE INDEX "redirects_rels_news_id_idx" ON "redirects_rels" USING btree ("news_id");
  CREATE INDEX "redirects_rels_job_openings_id_idx" ON "redirects_rels" USING btree ("job_openings_id");
  CREATE INDEX "forms_blocks_checkbox_order_idx" ON "forms_blocks_checkbox" USING btree ("_order");
  CREATE INDEX "forms_blocks_checkbox_parent_id_idx" ON "forms_blocks_checkbox" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_checkbox_path_idx" ON "forms_blocks_checkbox" USING btree ("_path");
  CREATE UNIQUE INDEX "forms_blocks_checkbox_locales_locale_parent_id_unique" ON "forms_blocks_checkbox_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_checkbox_locales_parent_id_idx" ON "forms_blocks_checkbox_locales" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_country_order_idx" ON "forms_blocks_country" USING btree ("_order");
  CREATE INDEX "forms_blocks_country_parent_id_idx" ON "forms_blocks_country" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_country_path_idx" ON "forms_blocks_country" USING btree ("_path");
  CREATE UNIQUE INDEX "forms_blocks_country_locales_locale_parent_id_unique" ON "forms_blocks_country_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_country_locales_parent_id_idx" ON "forms_blocks_country_locales" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_email_order_idx" ON "forms_blocks_email" USING btree ("_order");
  CREATE INDEX "forms_blocks_email_parent_id_idx" ON "forms_blocks_email" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_email_path_idx" ON "forms_blocks_email" USING btree ("_path");
  CREATE UNIQUE INDEX "forms_blocks_email_locales_locale_parent_id_unique" ON "forms_blocks_email_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_email_locales_parent_id_idx" ON "forms_blocks_email_locales" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_message_order_idx" ON "forms_blocks_message" USING btree ("_order");
  CREATE INDEX "forms_blocks_message_parent_id_idx" ON "forms_blocks_message" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_message_path_idx" ON "forms_blocks_message" USING btree ("_path");
  CREATE UNIQUE INDEX "forms_blocks_message_locales_locale_parent_id_unique" ON "forms_blocks_message_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_message_locales_parent_id_idx" ON "forms_blocks_message_locales" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_number_order_idx" ON "forms_blocks_number" USING btree ("_order");
  CREATE INDEX "forms_blocks_number_parent_id_idx" ON "forms_blocks_number" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_number_path_idx" ON "forms_blocks_number" USING btree ("_path");
  CREATE UNIQUE INDEX "forms_blocks_number_locales_locale_parent_id_unique" ON "forms_blocks_number_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_number_locales_parent_id_idx" ON "forms_blocks_number_locales" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_select_options_order_idx" ON "forms_blocks_select_options" USING btree ("_order");
  CREATE INDEX "forms_blocks_select_options_parent_id_idx" ON "forms_blocks_select_options" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "forms_blocks_select_options_locales_locale_parent_id_unique" ON "forms_blocks_select_options_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_select_options_locales_parent_id_idx" ON "forms_blocks_select_options_locales" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_select_order_idx" ON "forms_blocks_select" USING btree ("_order");
  CREATE INDEX "forms_blocks_select_parent_id_idx" ON "forms_blocks_select" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_select_path_idx" ON "forms_blocks_select" USING btree ("_path");
  CREATE UNIQUE INDEX "forms_blocks_select_locales_locale_parent_id_unique" ON "forms_blocks_select_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_select_locales_parent_id_idx" ON "forms_blocks_select_locales" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_text_order_idx" ON "forms_blocks_text" USING btree ("_order");
  CREATE INDEX "forms_blocks_text_parent_id_idx" ON "forms_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_text_path_idx" ON "forms_blocks_text" USING btree ("_path");
  CREATE UNIQUE INDEX "forms_blocks_text_locales_locale_parent_id_unique" ON "forms_blocks_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_text_locales_parent_id_idx" ON "forms_blocks_text_locales" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_textarea_order_idx" ON "forms_blocks_textarea" USING btree ("_order");
  CREATE INDEX "forms_blocks_textarea_parent_id_idx" ON "forms_blocks_textarea" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_textarea_path_idx" ON "forms_blocks_textarea" USING btree ("_path");
  CREATE UNIQUE INDEX "forms_blocks_textarea_locales_locale_parent_id_unique" ON "forms_blocks_textarea_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_textarea_locales_parent_id_idx" ON "forms_blocks_textarea_locales" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_choices_options_order_idx" ON "forms_blocks_choices_options" USING btree ("_order");
  CREATE INDEX "forms_blocks_choices_options_parent_id_idx" ON "forms_blocks_choices_options" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "forms_blocks_choices_options_locales_locale_parent_id_unique" ON "forms_blocks_choices_options_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_choices_options_locales_parent_id_idx" ON "forms_blocks_choices_options_locales" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_choices_order_idx" ON "forms_blocks_choices" USING btree ("_order");
  CREATE INDEX "forms_blocks_choices_parent_id_idx" ON "forms_blocks_choices" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_choices_path_idx" ON "forms_blocks_choices" USING btree ("_path");
  CREATE UNIQUE INDEX "forms_blocks_choices_locales_locale_parent_id_unique" ON "forms_blocks_choices_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_choices_locales_parent_id_idx" ON "forms_blocks_choices_locales" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_file_upload_order_idx" ON "forms_blocks_file_upload" USING btree ("_order");
  CREATE INDEX "forms_blocks_file_upload_parent_id_idx" ON "forms_blocks_file_upload" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_file_upload_path_idx" ON "forms_blocks_file_upload" USING btree ("_path");
  CREATE UNIQUE INDEX "forms_blocks_file_upload_locales_locale_parent_id_unique" ON "forms_blocks_file_upload_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_file_upload_locales_parent_id_idx" ON "forms_blocks_file_upload_locales" USING btree ("_parent_id");
  CREATE INDEX "forms_updated_at_idx" ON "forms" USING btree ("updated_at");
  CREATE INDEX "forms_created_at_idx" ON "forms" USING btree ("created_at");
  CREATE UNIQUE INDEX "forms_locales_locale_parent_id_unique" ON "forms_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_locales_parent_id_idx" ON "forms_locales" USING btree ("_parent_id");
  CREATE INDEX "form_submissions_submission_data_order_idx" ON "form_submissions_submission_data" USING btree ("_order");
  CREATE INDEX "form_submissions_submission_data_parent_id_idx" ON "form_submissions_submission_data" USING btree ("_parent_id");
  CREATE INDEX "form_submissions_form_idx" ON "form_submissions" USING btree ("form_id");
  CREATE INDEX "form_submissions_updated_at_idx" ON "form_submissions" USING btree ("updated_at");
  CREATE INDEX "form_submissions_created_at_idx" ON "form_submissions" USING btree ("created_at");
  CREATE INDEX "search_updated_at_idx" ON "search" USING btree ("updated_at");
  CREATE INDEX "search_created_at_idx" ON "search" USING btree ("created_at");
  CREATE UNIQUE INDEX "search_locales_locale_parent_id_unique" ON "search_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "search_locales_parent_id_idx" ON "search_locales" USING btree ("_parent_id");
  CREATE INDEX "search_rels_order_idx" ON "search_rels" USING btree ("order");
  CREATE INDEX "search_rels_parent_idx" ON "search_rels" USING btree ("parent_id");
  CREATE INDEX "search_rels_path_idx" ON "search_rels" USING btree ("path");
  CREATE INDEX "search_rels_pages_id_idx" ON "search_rels" USING btree ("pages_id");
  CREATE INDEX "search_rels_divisions_id_idx" ON "search_rels" USING btree ("divisions_id");
  CREATE INDEX "search_rels_projects_id_idx" ON "search_rels" USING btree ("projects_id");
  CREATE INDEX "search_rels_news_id_idx" ON "search_rels" USING btree ("news_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
  CREATE INDEX "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
  CREATE INDEX "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
  CREATE INDEX "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
  CREATE INDEX "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
  CREATE INDEX "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
  CREATE INDEX "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
  CREATE INDEX "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
  CREATE INDEX "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
  CREATE INDEX "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
  CREATE INDEX "payload_folders_folder_type_order_idx" ON "payload_folders_folder_type" USING btree ("order");
  CREATE INDEX "payload_folders_folder_type_parent_idx" ON "payload_folders_folder_type" USING btree ("parent_id");
  CREATE INDEX "payload_folders_name_idx" ON "payload_folders" USING btree ("name");
  CREATE INDEX "payload_folders_folder_idx" ON "payload_folders" USING btree ("folder_id");
  CREATE INDEX "payload_folders_updated_at_idx" ON "payload_folders" USING btree ("updated_at");
  CREATE INDEX "payload_folders_created_at_idx" ON "payload_folders" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_divisions_id_idx" ON "payload_locked_documents_rels" USING btree ("divisions_id");
  CREATE INDEX "payload_locked_documents_rels_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("projects_id");
  CREATE INDEX "payload_locked_documents_rels_news_id_idx" ON "payload_locked_documents_rels" USING btree ("news_id");
  CREATE INDEX "payload_locked_documents_rels_partners_id_idx" ON "payload_locked_documents_rels" USING btree ("partners_id");
  CREATE INDEX "payload_locked_documents_rels_team_members_id_idx" ON "payload_locked_documents_rels" USING btree ("team_members_id");
  CREATE INDEX "payload_locked_documents_rels_documents_id_idx" ON "payload_locked_documents_rels" USING btree ("documents_id");
  CREATE INDEX "payload_locked_documents_rels_reusable_blocks_id_idx" ON "payload_locked_documents_rels" USING btree ("reusable_blocks_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_form_files_id_idx" ON "payload_locked_documents_rels" USING btree ("form_files_id");
  CREATE INDEX "payload_locked_documents_rels_job_openings_id_idx" ON "payload_locked_documents_rels" USING btree ("job_openings_id");
  CREATE INDEX "payload_locked_documents_rels_applications_id_idx" ON "payload_locked_documents_rels" USING btree ("applications_id");
  CREATE INDEX "payload_locked_documents_rels_resumes_id_idx" ON "payload_locked_documents_rels" USING btree ("resumes_id");
  CREATE INDEX "payload_locked_documents_rels_vendors_id_idx" ON "payload_locked_documents_rels" USING btree ("vendors_id");
  CREATE INDEX "payload_locked_documents_rels_vendor_documents_id_idx" ON "payload_locked_documents_rels" USING btree ("vendor_documents_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_email_logs_id_idx" ON "payload_locked_documents_rels" USING btree ("email_logs_id");
  CREATE INDEX "payload_locked_documents_rels_audit_logs_id_idx" ON "payload_locked_documents_rels" USING btree ("audit_logs_id");
  CREATE INDEX "payload_locked_documents_rels_redirects_id_idx" ON "payload_locked_documents_rels" USING btree ("redirects_id");
  CREATE INDEX "payload_locked_documents_rels_forms_id_idx" ON "payload_locked_documents_rels" USING btree ("forms_id");
  CREATE INDEX "payload_locked_documents_rels_form_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("form_submissions_id");
  CREATE INDEX "payload_locked_documents_rels_search_id_idx" ON "payload_locked_documents_rels" USING btree ("search_id");
  CREATE INDEX "payload_locked_documents_rels_payload_folders_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_folders_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_vendors_id_idx" ON "payload_preferences_rels" USING btree ("vendors_id");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_company_phones_order_idx" ON "site_settings_company_phones" USING btree ("_order");
  CREATE INDEX "site_settings_company_phones_parent_id_idx" ON "site_settings_company_phones" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "site_settings_company_phones_locales_locale_parent_id_unique" ON "site_settings_company_phones_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_settings_company_phones_locales_parent_id_idx" ON "site_settings_company_phones_locales" USING btree ("_parent_id");
  CREATE INDEX "site_settings_company_emails_order_idx" ON "site_settings_company_emails" USING btree ("_order");
  CREATE INDEX "site_settings_company_emails_parent_id_idx" ON "site_settings_company_emails" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "site_settings_company_emails_locales_locale_parent_id_unique" ON "site_settings_company_emails_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_settings_company_emails_locales_parent_id_idx" ON "site_settings_company_emails_locales" USING btree ("_parent_id");
  CREATE INDEX "site_settings_social_profiles_order_idx" ON "site_settings_social_profiles" USING btree ("_order");
  CREATE INDEX "site_settings_social_profiles_parent_id_idx" ON "site_settings_social_profiles" USING btree ("_parent_id");
  CREATE INDEX "site_settings_general_general_logo_idx" ON "site_settings" USING btree ("general_logo_id");
  CREATE INDEX "site_settings_general_general_logo_light_idx" ON "site_settings" USING btree ("general_logo_light_id");
  CREATE INDEX "site_settings_general_general_og_image_idx" ON "site_settings" USING btree ("general_og_image_id");
  CREATE UNIQUE INDEX "site_settings_locales_locale_parent_id_unique" ON "site_settings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_settings_locales_parent_id_idx" ON "site_settings_locales" USING btree ("_parent_id");
  CREATE INDEX "header_top_bar_extra_links_order_idx" ON "header_top_bar_extra_links" USING btree ("_order");
  CREATE INDEX "header_top_bar_extra_links_parent_id_idx" ON "header_top_bar_extra_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "header_top_bar_extra_links_locales_locale_parent_id_unique" ON "header_top_bar_extra_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "header_top_bar_extra_links_locales_parent_id_idx" ON "header_top_bar_extra_links_locales" USING btree ("_parent_id");
  CREATE INDEX "header_nav_items_children_order_idx" ON "header_nav_items_children" USING btree ("_order");
  CREATE INDEX "header_nav_items_children_parent_id_idx" ON "header_nav_items_children" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "header_nav_items_children_locales_locale_parent_id_unique" ON "header_nav_items_children_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "header_nav_items_children_locales_parent_id_idx" ON "header_nav_items_children_locales" USING btree ("_parent_id");
  CREATE INDEX "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "header_nav_items_locales_locale_parent_id_unique" ON "header_nav_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "header_nav_items_locales_parent_id_idx" ON "header_nav_items_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "header_locales_locale_parent_id_unique" ON "header_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "header_locales_parent_id_idx" ON "header_locales" USING btree ("_parent_id");
  CREATE INDEX "header_rels_order_idx" ON "header_rels" USING btree ("order");
  CREATE INDEX "header_rels_parent_idx" ON "header_rels" USING btree ("parent_id");
  CREATE INDEX "header_rels_path_idx" ON "header_rels" USING btree ("path");
  CREATE INDEX "header_rels_pages_id_idx" ON "header_rels" USING btree ("pages_id");
  CREATE INDEX "header_rels_divisions_id_idx" ON "header_rels" USING btree ("divisions_id");
  CREATE INDEX "header_rels_projects_id_idx" ON "header_rels" USING btree ("projects_id");
  CREATE INDEX "header_rels_job_openings_id_idx" ON "header_rels" USING btree ("job_openings_id");
  CREATE INDEX "header_rels_news_id_idx" ON "header_rels" USING btree ("news_id");
  CREATE INDEX "footer_columns_links_order_idx" ON "footer_columns_links" USING btree ("_order");
  CREATE INDEX "footer_columns_links_parent_id_idx" ON "footer_columns_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_columns_links_locales_locale_parent_id_unique" ON "footer_columns_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_columns_links_locales_parent_id_idx" ON "footer_columns_links_locales" USING btree ("_parent_id");
  CREATE INDEX "footer_columns_order_idx" ON "footer_columns" USING btree ("_order");
  CREATE INDEX "footer_columns_parent_id_idx" ON "footer_columns" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_columns_locales_locale_parent_id_unique" ON "footer_columns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_columns_locales_parent_id_idx" ON "footer_columns_locales" USING btree ("_parent_id");
  CREATE INDEX "footer_bottom_links_order_idx" ON "footer_bottom_links" USING btree ("_order");
  CREATE INDEX "footer_bottom_links_parent_id_idx" ON "footer_bottom_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_bottom_links_locales_locale_parent_id_unique" ON "footer_bottom_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_bottom_links_locales_parent_id_idx" ON "footer_bottom_links_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_locales_locale_parent_id_unique" ON "footer_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_locales_parent_id_idx" ON "footer_locales" USING btree ("_parent_id");
  CREATE INDEX "footer_rels_order_idx" ON "footer_rels" USING btree ("order");
  CREATE INDEX "footer_rels_parent_idx" ON "footer_rels" USING btree ("parent_id");
  CREATE INDEX "footer_rels_path_idx" ON "footer_rels" USING btree ("path");
  CREATE INDEX "footer_rels_pages_id_idx" ON "footer_rels" USING btree ("pages_id");
  CREATE INDEX "footer_rels_divisions_id_idx" ON "footer_rels" USING btree ("divisions_id");
  CREATE INDEX "footer_rels_projects_id_idx" ON "footer_rels" USING btree ("projects_id");
  CREATE INDEX "footer_rels_job_openings_id_idx" ON "footer_rels" USING btree ("job_openings_id");
  CREATE INDEX "footer_rels_news_id_idx" ON "footer_rels" USING btree ("news_id");
  CREATE INDEX "email_settings_routing_contact_recipients_order_idx" ON "email_settings_routing_contact_recipients" USING btree ("_order");
  CREATE INDEX "email_settings_routing_contact_recipients_parent_id_idx" ON "email_settings_routing_contact_recipients" USING btree ("_parent_id");
  CREATE INDEX "email_settings_routing_quote_recipients_order_idx" ON "email_settings_routing_quote_recipients" USING btree ("_order");
  CREATE INDEX "email_settings_routing_quote_recipients_parent_id_idx" ON "email_settings_routing_quote_recipients" USING btree ("_parent_id");
  CREATE INDEX "email_settings_routing_careers_recipients_order_idx" ON "email_settings_routing_careers_recipients" USING btree ("_order");
  CREATE INDEX "email_settings_routing_careers_recipients_parent_id_idx" ON "email_settings_routing_careers_recipients" USING btree ("_parent_id");
  CREATE INDEX "email_settings_routing_vendor_recipients_order_idx" ON "email_settings_routing_vendor_recipients" USING btree ("_order");
  CREATE INDEX "email_settings_routing_vendor_recipients_parent_id_idx" ON "email_settings_routing_vendor_recipients" USING btree ("_parent_id");
  CREATE INDEX "email_settings_routing_fallback_recipients_order_idx" ON "email_settings_routing_fallback_recipients" USING btree ("_order");
  CREATE INDEX "email_settings_routing_fallback_recipients_parent_id_idx" ON "email_settings_routing_fallback_recipients" USING btree ("_parent_id");
  CREATE INDEX "careers_settings_stage_emails_order_idx" ON "careers_settings_stage_emails" USING btree ("_order");
  CREATE INDEX "careers_settings_stage_emails_parent_id_idx" ON "careers_settings_stage_emails" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "careers_settings_locales_locale_parent_id_unique" ON "careers_settings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "careers_settings_locales_parent_id_idx" ON "careers_settings_locales" USING btree ("_parent_id");
  CREATE INDEX "vendor_settings_document_types_required_for_order_idx" ON "vendor_settings_document_types_required_for" USING btree ("order");
  CREATE INDEX "vendor_settings_document_types_required_for_parent_idx" ON "vendor_settings_document_types_required_for" USING btree ("parent_id");
  CREATE INDEX "vendor_settings_document_types_order_idx" ON "vendor_settings_document_types" USING btree ("_order");
  CREATE INDEX "vendor_settings_document_types_parent_id_idx" ON "vendor_settings_document_types" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "vendor_settings_document_types_locales_locale_parent_id_uniq" ON "vendor_settings_document_types_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "vendor_settings_document_types_locales_parent_id_idx" ON "vendor_settings_document_types_locales" USING btree ("_parent_id");
  CREATE INDEX "vendor_settings_categories_order_idx" ON "vendor_settings_categories" USING btree ("_order");
  CREATE INDEX "vendor_settings_categories_parent_id_idx" ON "vendor_settings_categories" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "vendor_settings_categories_locales_locale_parent_id_unique" ON "vendor_settings_categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "vendor_settings_categories_locales_parent_id_idx" ON "vendor_settings_categories_locales" USING btree ("_parent_id");
  CREATE INDEX "vendor_settings_status_emails_order_idx" ON "vendor_settings_status_emails" USING btree ("_order");
  CREATE INDEX "vendor_settings_status_emails_parent_id_idx" ON "vendor_settings_status_emails" USING btree ("_parent_id");
  CREATE INDEX "vendor_settings_code_of_conduct_idx" ON "vendor_settings" USING btree ("code_of_conduct_id");
  CREATE INDEX "vendor_settings_hse_policy_idx" ON "vendor_settings" USING btree ("hse_policy_id");
  CREATE UNIQUE INDEX "vendor_settings_locales_locale_parent_id_unique" ON "vendor_settings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "vendor_settings_locales_parent_id_idx" ON "vendor_settings_locales" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_hero_links" CASCADE;
  DROP TABLE "pages_hero_links_locales" CASCADE;
  DROP TABLE "pages_hero_panel_items" CASCADE;
  DROP TABLE "pages_hero_panel_items_locales" CASCADE;
  DROP TABLE "pages_hero_tiles" CASCADE;
  DROP TABLE "pages_hero_tiles_locales" CASCADE;
  DROP TABLE "pages_hero_stats" CASCADE;
  DROP TABLE "pages_hero_stats_locales" CASCADE;
  DROP TABLE "pages_blocks_divisions_grid" CASCADE;
  DROP TABLE "pages_blocks_divisions_grid_locales" CASCADE;
  DROP TABLE "pages_blocks_process_steps_steps" CASCADE;
  DROP TABLE "pages_blocks_process_steps_steps_locales" CASCADE;
  DROP TABLE "pages_blocks_process_steps" CASCADE;
  DROP TABLE "pages_blocks_process_steps_locales" CASCADE;
  DROP TABLE "pages_blocks_feature_cards_cards_items" CASCADE;
  DROP TABLE "pages_blocks_feature_cards_cards_items_locales" CASCADE;
  DROP TABLE "pages_blocks_feature_cards_cards" CASCADE;
  DROP TABLE "pages_blocks_feature_cards_cards_locales" CASCADE;
  DROP TABLE "pages_blocks_feature_cards" CASCADE;
  DROP TABLE "pages_blocks_feature_cards_locales" CASCADE;
  DROP TABLE "pages_blocks_stats_items" CASCADE;
  DROP TABLE "pages_blocks_stats_items_locales" CASCADE;
  DROP TABLE "pages_blocks_stats" CASCADE;
  DROP TABLE "pages_blocks_logos" CASCADE;
  DROP TABLE "pages_blocks_logos_locales" CASCADE;
  DROP TABLE "pages_blocks_cta_links" CASCADE;
  DROP TABLE "pages_blocks_cta_links_locales" CASCADE;
  DROP TABLE "pages_blocks_cta" CASCADE;
  DROP TABLE "pages_blocks_cta_locales" CASCADE;
  DROP TABLE "pages_blocks_content" CASCADE;
  DROP TABLE "pages_blocks_content_locales" CASCADE;
  DROP TABLE "pages_blocks_chips_items" CASCADE;
  DROP TABLE "pages_blocks_chips_items_locales" CASCADE;
  DROP TABLE "pages_blocks_chips" CASCADE;
  DROP TABLE "pages_blocks_chips_locales" CASCADE;
  DROP TABLE "pages_blocks_tabs_tabs_items" CASCADE;
  DROP TABLE "pages_blocks_tabs_tabs_items_locales" CASCADE;
  DROP TABLE "pages_blocks_tabs_tabs" CASCADE;
  DROP TABLE "pages_blocks_tabs_tabs_locales" CASCADE;
  DROP TABLE "pages_blocks_tabs" CASCADE;
  DROP TABLE "pages_blocks_tabs_locales" CASCADE;
  DROP TABLE "pages_blocks_comparison_rows" CASCADE;
  DROP TABLE "pages_blocks_comparison_rows_locales" CASCADE;
  DROP TABLE "pages_blocks_comparison" CASCADE;
  DROP TABLE "pages_blocks_comparison_locales" CASCADE;
  DROP TABLE "pages_blocks_faq_items" CASCADE;
  DROP TABLE "pages_blocks_faq_items_locales" CASCADE;
  DROP TABLE "pages_blocks_faq" CASCADE;
  DROP TABLE "pages_blocks_faq_locales" CASCADE;
  DROP TABLE "pages_blocks_downloads" CASCADE;
  DROP TABLE "pages_blocks_downloads_locales" CASCADE;
  DROP TABLE "pages_blocks_team" CASCADE;
  DROP TABLE "pages_blocks_team_locales" CASCADE;
  DROP TABLE "pages_blocks_media_block" CASCADE;
  DROP TABLE "pages_blocks_media_block_locales" CASCADE;
  DROP TABLE "pages_blocks_image_text_links" CASCADE;
  DROP TABLE "pages_blocks_image_text_links_locales" CASCADE;
  DROP TABLE "pages_blocks_image_text" CASCADE;
  DROP TABLE "pages_blocks_image_text_locales" CASCADE;
  DROP TABLE "pages_blocks_form_block" CASCADE;
  DROP TABLE "pages_blocks_form_block_locales" CASCADE;
  DROP TABLE "pages_blocks_projects" CASCADE;
  DROP TABLE "pages_blocks_projects_locales" CASCADE;
  DROP TABLE "pages_blocks_jobs" CASCADE;
  DROP TABLE "pages_blocks_jobs_locales" CASCADE;
  DROP TABLE "pages_blocks_list_panel_items" CASCADE;
  DROP TABLE "pages_blocks_list_panel_items_locales" CASCADE;
  DROP TABLE "pages_blocks_list_panel" CASCADE;
  DROP TABLE "pages_blocks_list_panel_locales" CASCADE;
  DROP TABLE "pages_blocks_rfq_card" CASCADE;
  DROP TABLE "pages_blocks_rfq_card_locales" CASCADE;
  DROP TABLE "pages_blocks_reusable" CASCADE;
  DROP TABLE "pages_breadcrumbs" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_version_hero_links" CASCADE;
  DROP TABLE "_pages_v_version_hero_links_locales" CASCADE;
  DROP TABLE "_pages_v_version_hero_panel_items" CASCADE;
  DROP TABLE "_pages_v_version_hero_panel_items_locales" CASCADE;
  DROP TABLE "_pages_v_version_hero_tiles" CASCADE;
  DROP TABLE "_pages_v_version_hero_tiles_locales" CASCADE;
  DROP TABLE "_pages_v_version_hero_stats" CASCADE;
  DROP TABLE "_pages_v_version_hero_stats_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_divisions_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_divisions_grid_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_process_steps_steps" CASCADE;
  DROP TABLE "_pages_v_blocks_process_steps_steps_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_process_steps" CASCADE;
  DROP TABLE "_pages_v_blocks_process_steps_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_cards_cards_items" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_cards_cards_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_cards_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_cards_cards_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_cards_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_items" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_logos" CASCADE;
  DROP TABLE "_pages_v_blocks_logos_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_links" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_links_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_cta" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_content" CASCADE;
  DROP TABLE "_pages_v_blocks_content_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_chips_items" CASCADE;
  DROP TABLE "_pages_v_blocks_chips_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_chips" CASCADE;
  DROP TABLE "_pages_v_blocks_chips_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_tabs_tabs_items" CASCADE;
  DROP TABLE "_pages_v_blocks_tabs_tabs_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_tabs_tabs" CASCADE;
  DROP TABLE "_pages_v_blocks_tabs_tabs_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_tabs" CASCADE;
  DROP TABLE "_pages_v_blocks_tabs_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_comparison_rows" CASCADE;
  DROP TABLE "_pages_v_blocks_comparison_rows_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_comparison" CASCADE;
  DROP TABLE "_pages_v_blocks_comparison_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_items" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_faq" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_downloads" CASCADE;
  DROP TABLE "_pages_v_blocks_downloads_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_team" CASCADE;
  DROP TABLE "_pages_v_blocks_team_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_media_block" CASCADE;
  DROP TABLE "_pages_v_blocks_media_block_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_image_text_links" CASCADE;
  DROP TABLE "_pages_v_blocks_image_text_links_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_image_text" CASCADE;
  DROP TABLE "_pages_v_blocks_image_text_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_form_block" CASCADE;
  DROP TABLE "_pages_v_blocks_form_block_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_projects" CASCADE;
  DROP TABLE "_pages_v_blocks_projects_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_jobs" CASCADE;
  DROP TABLE "_pages_v_blocks_jobs_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_list_panel_items" CASCADE;
  DROP TABLE "_pages_v_blocks_list_panel_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_list_panel" CASCADE;
  DROP TABLE "_pages_v_blocks_list_panel_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_rfq_card" CASCADE;
  DROP TABLE "_pages_v_blocks_rfq_card_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_reusable" CASCADE;
  DROP TABLE "_pages_v_version_breadcrumbs" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_locales" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "divisions_chips" CASCADE;
  DROP TABLE "divisions_chips_locales" CASCADE;
  DROP TABLE "divisions_hero_links" CASCADE;
  DROP TABLE "divisions_hero_links_locales" CASCADE;
  DROP TABLE "divisions_hero_panel_items" CASCADE;
  DROP TABLE "divisions_hero_panel_items_locales" CASCADE;
  DROP TABLE "divisions_hero_tiles" CASCADE;
  DROP TABLE "divisions_hero_tiles_locales" CASCADE;
  DROP TABLE "divisions_hero_stats" CASCADE;
  DROP TABLE "divisions_hero_stats_locales" CASCADE;
  DROP TABLE "divisions_blocks_divisions_grid" CASCADE;
  DROP TABLE "divisions_blocks_divisions_grid_locales" CASCADE;
  DROP TABLE "divisions_blocks_process_steps_steps" CASCADE;
  DROP TABLE "divisions_blocks_process_steps_steps_locales" CASCADE;
  DROP TABLE "divisions_blocks_process_steps" CASCADE;
  DROP TABLE "divisions_blocks_process_steps_locales" CASCADE;
  DROP TABLE "divisions_blocks_feature_cards_cards_items" CASCADE;
  DROP TABLE "divisions_blocks_feature_cards_cards_items_locales" CASCADE;
  DROP TABLE "divisions_blocks_feature_cards_cards" CASCADE;
  DROP TABLE "divisions_blocks_feature_cards_cards_locales" CASCADE;
  DROP TABLE "divisions_blocks_feature_cards" CASCADE;
  DROP TABLE "divisions_blocks_feature_cards_locales" CASCADE;
  DROP TABLE "divisions_blocks_stats_items" CASCADE;
  DROP TABLE "divisions_blocks_stats_items_locales" CASCADE;
  DROP TABLE "divisions_blocks_stats" CASCADE;
  DROP TABLE "divisions_blocks_logos" CASCADE;
  DROP TABLE "divisions_blocks_logos_locales" CASCADE;
  DROP TABLE "divisions_blocks_cta_links" CASCADE;
  DROP TABLE "divisions_blocks_cta_links_locales" CASCADE;
  DROP TABLE "divisions_blocks_cta" CASCADE;
  DROP TABLE "divisions_blocks_cta_locales" CASCADE;
  DROP TABLE "divisions_blocks_content" CASCADE;
  DROP TABLE "divisions_blocks_content_locales" CASCADE;
  DROP TABLE "divisions_blocks_chips_items" CASCADE;
  DROP TABLE "divisions_blocks_chips_items_locales" CASCADE;
  DROP TABLE "divisions_blocks_chips" CASCADE;
  DROP TABLE "divisions_blocks_chips_locales" CASCADE;
  DROP TABLE "divisions_blocks_tabs_tabs_items" CASCADE;
  DROP TABLE "divisions_blocks_tabs_tabs_items_locales" CASCADE;
  DROP TABLE "divisions_blocks_tabs_tabs" CASCADE;
  DROP TABLE "divisions_blocks_tabs_tabs_locales" CASCADE;
  DROP TABLE "divisions_blocks_tabs" CASCADE;
  DROP TABLE "divisions_blocks_tabs_locales" CASCADE;
  DROP TABLE "divisions_blocks_comparison_rows" CASCADE;
  DROP TABLE "divisions_blocks_comparison_rows_locales" CASCADE;
  DROP TABLE "divisions_blocks_comparison" CASCADE;
  DROP TABLE "divisions_blocks_comparison_locales" CASCADE;
  DROP TABLE "divisions_blocks_faq_items" CASCADE;
  DROP TABLE "divisions_blocks_faq_items_locales" CASCADE;
  DROP TABLE "divisions_blocks_faq" CASCADE;
  DROP TABLE "divisions_blocks_faq_locales" CASCADE;
  DROP TABLE "divisions_blocks_downloads" CASCADE;
  DROP TABLE "divisions_blocks_downloads_locales" CASCADE;
  DROP TABLE "divisions_blocks_team" CASCADE;
  DROP TABLE "divisions_blocks_team_locales" CASCADE;
  DROP TABLE "divisions_blocks_media_block" CASCADE;
  DROP TABLE "divisions_blocks_media_block_locales" CASCADE;
  DROP TABLE "divisions_blocks_image_text_links" CASCADE;
  DROP TABLE "divisions_blocks_image_text_links_locales" CASCADE;
  DROP TABLE "divisions_blocks_image_text" CASCADE;
  DROP TABLE "divisions_blocks_image_text_locales" CASCADE;
  DROP TABLE "divisions_blocks_form_block" CASCADE;
  DROP TABLE "divisions_blocks_form_block_locales" CASCADE;
  DROP TABLE "divisions_blocks_projects" CASCADE;
  DROP TABLE "divisions_blocks_projects_locales" CASCADE;
  DROP TABLE "divisions_blocks_jobs" CASCADE;
  DROP TABLE "divisions_blocks_jobs_locales" CASCADE;
  DROP TABLE "divisions_blocks_list_panel_items" CASCADE;
  DROP TABLE "divisions_blocks_list_panel_items_locales" CASCADE;
  DROP TABLE "divisions_blocks_list_panel" CASCADE;
  DROP TABLE "divisions_blocks_list_panel_locales" CASCADE;
  DROP TABLE "divisions_blocks_rfq_card" CASCADE;
  DROP TABLE "divisions_blocks_rfq_card_locales" CASCADE;
  DROP TABLE "divisions_blocks_reusable" CASCADE;
  DROP TABLE "divisions" CASCADE;
  DROP TABLE "divisions_locales" CASCADE;
  DROP TABLE "divisions_rels" CASCADE;
  DROP TABLE "_divisions_v_version_chips" CASCADE;
  DROP TABLE "_divisions_v_version_chips_locales" CASCADE;
  DROP TABLE "_divisions_v_version_hero_links" CASCADE;
  DROP TABLE "_divisions_v_version_hero_links_locales" CASCADE;
  DROP TABLE "_divisions_v_version_hero_panel_items" CASCADE;
  DROP TABLE "_divisions_v_version_hero_panel_items_locales" CASCADE;
  DROP TABLE "_divisions_v_version_hero_tiles" CASCADE;
  DROP TABLE "_divisions_v_version_hero_tiles_locales" CASCADE;
  DROP TABLE "_divisions_v_version_hero_stats" CASCADE;
  DROP TABLE "_divisions_v_version_hero_stats_locales" CASCADE;
  DROP TABLE "_divisions_v_blocks_divisions_grid" CASCADE;
  DROP TABLE "_divisions_v_blocks_divisions_grid_locales" CASCADE;
  DROP TABLE "_divisions_v_blocks_process_steps_steps" CASCADE;
  DROP TABLE "_divisions_v_blocks_process_steps_steps_locales" CASCADE;
  DROP TABLE "_divisions_v_blocks_process_steps" CASCADE;
  DROP TABLE "_divisions_v_blocks_process_steps_locales" CASCADE;
  DROP TABLE "_divisions_v_blocks_feature_cards_cards_items" CASCADE;
  DROP TABLE "_divisions_v_blocks_feature_cards_cards_items_locales" CASCADE;
  DROP TABLE "_divisions_v_blocks_feature_cards_cards" CASCADE;
  DROP TABLE "_divisions_v_blocks_feature_cards_cards_locales" CASCADE;
  DROP TABLE "_divisions_v_blocks_feature_cards" CASCADE;
  DROP TABLE "_divisions_v_blocks_feature_cards_locales" CASCADE;
  DROP TABLE "_divisions_v_blocks_stats_items" CASCADE;
  DROP TABLE "_divisions_v_blocks_stats_items_locales" CASCADE;
  DROP TABLE "_divisions_v_blocks_stats" CASCADE;
  DROP TABLE "_divisions_v_blocks_logos" CASCADE;
  DROP TABLE "_divisions_v_blocks_logos_locales" CASCADE;
  DROP TABLE "_divisions_v_blocks_cta_links" CASCADE;
  DROP TABLE "_divisions_v_blocks_cta_links_locales" CASCADE;
  DROP TABLE "_divisions_v_blocks_cta" CASCADE;
  DROP TABLE "_divisions_v_blocks_cta_locales" CASCADE;
  DROP TABLE "_divisions_v_blocks_content" CASCADE;
  DROP TABLE "_divisions_v_blocks_content_locales" CASCADE;
  DROP TABLE "_divisions_v_blocks_chips_items" CASCADE;
  DROP TABLE "_divisions_v_blocks_chips_items_locales" CASCADE;
  DROP TABLE "_divisions_v_blocks_chips" CASCADE;
  DROP TABLE "_divisions_v_blocks_chips_locales" CASCADE;
  DROP TABLE "_divisions_v_blocks_tabs_tabs_items" CASCADE;
  DROP TABLE "_divisions_v_blocks_tabs_tabs_items_locales" CASCADE;
  DROP TABLE "_divisions_v_blocks_tabs_tabs" CASCADE;
  DROP TABLE "_divisions_v_blocks_tabs_tabs_locales" CASCADE;
  DROP TABLE "_divisions_v_blocks_tabs" CASCADE;
  DROP TABLE "_divisions_v_blocks_tabs_locales" CASCADE;
  DROP TABLE "_divisions_v_blocks_comparison_rows" CASCADE;
  DROP TABLE "_divisions_v_blocks_comparison_rows_locales" CASCADE;
  DROP TABLE "_divisions_v_blocks_comparison" CASCADE;
  DROP TABLE "_divisions_v_blocks_comparison_locales" CASCADE;
  DROP TABLE "_divisions_v_blocks_faq_items" CASCADE;
  DROP TABLE "_divisions_v_blocks_faq_items_locales" CASCADE;
  DROP TABLE "_divisions_v_blocks_faq" CASCADE;
  DROP TABLE "_divisions_v_blocks_faq_locales" CASCADE;
  DROP TABLE "_divisions_v_blocks_downloads" CASCADE;
  DROP TABLE "_divisions_v_blocks_downloads_locales" CASCADE;
  DROP TABLE "_divisions_v_blocks_team" CASCADE;
  DROP TABLE "_divisions_v_blocks_team_locales" CASCADE;
  DROP TABLE "_divisions_v_blocks_media_block" CASCADE;
  DROP TABLE "_divisions_v_blocks_media_block_locales" CASCADE;
  DROP TABLE "_divisions_v_blocks_image_text_links" CASCADE;
  DROP TABLE "_divisions_v_blocks_image_text_links_locales" CASCADE;
  DROP TABLE "_divisions_v_blocks_image_text" CASCADE;
  DROP TABLE "_divisions_v_blocks_image_text_locales" CASCADE;
  DROP TABLE "_divisions_v_blocks_form_block" CASCADE;
  DROP TABLE "_divisions_v_blocks_form_block_locales" CASCADE;
  DROP TABLE "_divisions_v_blocks_projects" CASCADE;
  DROP TABLE "_divisions_v_blocks_projects_locales" CASCADE;
  DROP TABLE "_divisions_v_blocks_jobs" CASCADE;
  DROP TABLE "_divisions_v_blocks_jobs_locales" CASCADE;
  DROP TABLE "_divisions_v_blocks_list_panel_items" CASCADE;
  DROP TABLE "_divisions_v_blocks_list_panel_items_locales" CASCADE;
  DROP TABLE "_divisions_v_blocks_list_panel" CASCADE;
  DROP TABLE "_divisions_v_blocks_list_panel_locales" CASCADE;
  DROP TABLE "_divisions_v_blocks_rfq_card" CASCADE;
  DROP TABLE "_divisions_v_blocks_rfq_card_locales" CASCADE;
  DROP TABLE "_divisions_v_blocks_reusable" CASCADE;
  DROP TABLE "_divisions_v" CASCADE;
  DROP TABLE "_divisions_v_locales" CASCADE;
  DROP TABLE "_divisions_v_rels" CASCADE;
  DROP TABLE "projects_metrics" CASCADE;
  DROP TABLE "projects_metrics_locales" CASCADE;
  DROP TABLE "projects" CASCADE;
  DROP TABLE "projects_locales" CASCADE;
  DROP TABLE "projects_rels" CASCADE;
  DROP TABLE "_projects_v_version_metrics" CASCADE;
  DROP TABLE "_projects_v_version_metrics_locales" CASCADE;
  DROP TABLE "_projects_v" CASCADE;
  DROP TABLE "_projects_v_locales" CASCADE;
  DROP TABLE "_projects_v_rels" CASCADE;
  DROP TABLE "news" CASCADE;
  DROP TABLE "news_locales" CASCADE;
  DROP TABLE "_news_v" CASCADE;
  DROP TABLE "_news_v_locales" CASCADE;
  DROP TABLE "partners" CASCADE;
  DROP TABLE "team_members" CASCADE;
  DROP TABLE "team_members_locales" CASCADE;
  DROP TABLE "documents" CASCADE;
  DROP TABLE "documents_locales" CASCADE;
  DROP TABLE "reusable_blocks_blocks_divisions_grid" CASCADE;
  DROP TABLE "reusable_blocks_blocks_divisions_grid_locales" CASCADE;
  DROP TABLE "reusable_blocks_blocks_process_steps_steps" CASCADE;
  DROP TABLE "reusable_blocks_blocks_process_steps_steps_locales" CASCADE;
  DROP TABLE "reusable_blocks_blocks_process_steps" CASCADE;
  DROP TABLE "reusable_blocks_blocks_process_steps_locales" CASCADE;
  DROP TABLE "reusable_blocks_blocks_feature_cards_cards_items" CASCADE;
  DROP TABLE "reusable_blocks_blocks_feature_cards_cards_items_locales" CASCADE;
  DROP TABLE "reusable_blocks_blocks_feature_cards_cards" CASCADE;
  DROP TABLE "reusable_blocks_blocks_feature_cards_cards_locales" CASCADE;
  DROP TABLE "reusable_blocks_blocks_feature_cards" CASCADE;
  DROP TABLE "reusable_blocks_blocks_feature_cards_locales" CASCADE;
  DROP TABLE "reusable_blocks_blocks_stats_items" CASCADE;
  DROP TABLE "reusable_blocks_blocks_stats_items_locales" CASCADE;
  DROP TABLE "reusable_blocks_blocks_stats" CASCADE;
  DROP TABLE "reusable_blocks_blocks_logos" CASCADE;
  DROP TABLE "reusable_blocks_blocks_logos_locales" CASCADE;
  DROP TABLE "reusable_blocks_blocks_cta_links" CASCADE;
  DROP TABLE "reusable_blocks_blocks_cta_links_locales" CASCADE;
  DROP TABLE "reusable_blocks_blocks_cta" CASCADE;
  DROP TABLE "reusable_blocks_blocks_cta_locales" CASCADE;
  DROP TABLE "reusable_blocks_blocks_content" CASCADE;
  DROP TABLE "reusable_blocks_blocks_content_locales" CASCADE;
  DROP TABLE "reusable_blocks_blocks_chips_items" CASCADE;
  DROP TABLE "reusable_blocks_blocks_chips_items_locales" CASCADE;
  DROP TABLE "reusable_blocks_blocks_chips" CASCADE;
  DROP TABLE "reusable_blocks_blocks_chips_locales" CASCADE;
  DROP TABLE "reusable_blocks_blocks_tabs_tabs_items" CASCADE;
  DROP TABLE "reusable_blocks_blocks_tabs_tabs_items_locales" CASCADE;
  DROP TABLE "reusable_blocks_blocks_tabs_tabs" CASCADE;
  DROP TABLE "reusable_blocks_blocks_tabs_tabs_locales" CASCADE;
  DROP TABLE "reusable_blocks_blocks_tabs" CASCADE;
  DROP TABLE "reusable_blocks_blocks_tabs_locales" CASCADE;
  DROP TABLE "reusable_blocks_blocks_comparison_rows" CASCADE;
  DROP TABLE "reusable_blocks_blocks_comparison_rows_locales" CASCADE;
  DROP TABLE "reusable_blocks_blocks_comparison" CASCADE;
  DROP TABLE "reusable_blocks_blocks_comparison_locales" CASCADE;
  DROP TABLE "reusable_blocks_blocks_faq_items" CASCADE;
  DROP TABLE "reusable_blocks_blocks_faq_items_locales" CASCADE;
  DROP TABLE "reusable_blocks_blocks_faq" CASCADE;
  DROP TABLE "reusable_blocks_blocks_faq_locales" CASCADE;
  DROP TABLE "reusable_blocks_blocks_downloads" CASCADE;
  DROP TABLE "reusable_blocks_blocks_downloads_locales" CASCADE;
  DROP TABLE "reusable_blocks_blocks_team" CASCADE;
  DROP TABLE "reusable_blocks_blocks_team_locales" CASCADE;
  DROP TABLE "reusable_blocks_blocks_media_block" CASCADE;
  DROP TABLE "reusable_blocks_blocks_media_block_locales" CASCADE;
  DROP TABLE "reusable_blocks_blocks_image_text_links" CASCADE;
  DROP TABLE "reusable_blocks_blocks_image_text_links_locales" CASCADE;
  DROP TABLE "reusable_blocks_blocks_image_text" CASCADE;
  DROP TABLE "reusable_blocks_blocks_image_text_locales" CASCADE;
  DROP TABLE "reusable_blocks_blocks_form_block" CASCADE;
  DROP TABLE "reusable_blocks_blocks_form_block_locales" CASCADE;
  DROP TABLE "reusable_blocks_blocks_projects" CASCADE;
  DROP TABLE "reusable_blocks_blocks_projects_locales" CASCADE;
  DROP TABLE "reusable_blocks_blocks_jobs" CASCADE;
  DROP TABLE "reusable_blocks_blocks_jobs_locales" CASCADE;
  DROP TABLE "reusable_blocks_blocks_list_panel_items" CASCADE;
  DROP TABLE "reusable_blocks_blocks_list_panel_items_locales" CASCADE;
  DROP TABLE "reusable_blocks_blocks_list_panel" CASCADE;
  DROP TABLE "reusable_blocks_blocks_list_panel_locales" CASCADE;
  DROP TABLE "reusable_blocks_blocks_rfq_card" CASCADE;
  DROP TABLE "reusable_blocks_blocks_rfq_card_locales" CASCADE;
  DROP TABLE "reusable_blocks" CASCADE;
  DROP TABLE "reusable_blocks_rels" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "form_files" CASCADE;
  DROP TABLE "job_openings_responsibilities" CASCADE;
  DROP TABLE "job_openings_responsibilities_locales" CASCADE;
  DROP TABLE "job_openings_requirements" CASCADE;
  DROP TABLE "job_openings_requirements_locales" CASCADE;
  DROP TABLE "job_openings_benefits" CASCADE;
  DROP TABLE "job_openings_benefits_locales" CASCADE;
  DROP TABLE "job_openings_skills" CASCADE;
  DROP TABLE "job_openings_certifications" CASCADE;
  DROP TABLE "job_openings_screening_questions" CASCADE;
  DROP TABLE "job_openings_screening_questions_locales" CASCADE;
  DROP TABLE "job_openings_notify_recipients" CASCADE;
  DROP TABLE "job_openings" CASCADE;
  DROP TABLE "job_openings_locales" CASCADE;
  DROP TABLE "applications_screening_answers" CASCADE;
  DROP TABLE "applications_notes" CASCADE;
  DROP TABLE "applications_activity" CASCADE;
  DROP TABLE "applications_tags" CASCADE;
  DROP TABLE "applications" CASCADE;
  DROP TABLE "resumes" CASCADE;
  DROP TABLE "vendors_regions" CASCADE;
  DROP TABLE "vendors_certifications" CASCADE;
  DROP TABLE "vendors_references" CASCADE;
  DROP TABLE "vendors_documents" CASCADE;
  DROP TABLE "vendors_internal_notes" CASCADE;
  DROP TABLE "vendors_status_history" CASCADE;
  DROP TABLE "vendors_sessions" CASCADE;
  DROP TABLE "vendors" CASCADE;
  DROP TABLE "vendors_texts" CASCADE;
  DROP TABLE "vendors_rels" CASCADE;
  DROP TABLE "vendor_documents" CASCADE;
  DROP TABLE "users_roles" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "email_logs" CASCADE;
  DROP TABLE "audit_logs" CASCADE;
  DROP TABLE "redirects" CASCADE;
  DROP TABLE "redirects_rels" CASCADE;
  DROP TABLE "forms_blocks_checkbox" CASCADE;
  DROP TABLE "forms_blocks_checkbox_locales" CASCADE;
  DROP TABLE "forms_blocks_country" CASCADE;
  DROP TABLE "forms_blocks_country_locales" CASCADE;
  DROP TABLE "forms_blocks_email" CASCADE;
  DROP TABLE "forms_blocks_email_locales" CASCADE;
  DROP TABLE "forms_blocks_message" CASCADE;
  DROP TABLE "forms_blocks_message_locales" CASCADE;
  DROP TABLE "forms_blocks_number" CASCADE;
  DROP TABLE "forms_blocks_number_locales" CASCADE;
  DROP TABLE "forms_blocks_select_options" CASCADE;
  DROP TABLE "forms_blocks_select_options_locales" CASCADE;
  DROP TABLE "forms_blocks_select" CASCADE;
  DROP TABLE "forms_blocks_select_locales" CASCADE;
  DROP TABLE "forms_blocks_text" CASCADE;
  DROP TABLE "forms_blocks_text_locales" CASCADE;
  DROP TABLE "forms_blocks_textarea" CASCADE;
  DROP TABLE "forms_blocks_textarea_locales" CASCADE;
  DROP TABLE "forms_blocks_choices_options" CASCADE;
  DROP TABLE "forms_blocks_choices_options_locales" CASCADE;
  DROP TABLE "forms_blocks_choices" CASCADE;
  DROP TABLE "forms_blocks_choices_locales" CASCADE;
  DROP TABLE "forms_blocks_file_upload" CASCADE;
  DROP TABLE "forms_blocks_file_upload_locales" CASCADE;
  DROP TABLE "forms" CASCADE;
  DROP TABLE "forms_locales" CASCADE;
  DROP TABLE "form_submissions_submission_data" CASCADE;
  DROP TABLE "form_submissions" CASCADE;
  DROP TABLE "search" CASCADE;
  DROP TABLE "search_locales" CASCADE;
  DROP TABLE "search_rels" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_jobs_log" CASCADE;
  DROP TABLE "payload_jobs" CASCADE;
  DROP TABLE "payload_folders_folder_type" CASCADE;
  DROP TABLE "payload_folders" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings_company_phones" CASCADE;
  DROP TABLE "site_settings_company_phones_locales" CASCADE;
  DROP TABLE "site_settings_company_emails" CASCADE;
  DROP TABLE "site_settings_company_emails_locales" CASCADE;
  DROP TABLE "site_settings_social_profiles" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "site_settings_locales" CASCADE;
  DROP TABLE "header_top_bar_extra_links" CASCADE;
  DROP TABLE "header_top_bar_extra_links_locales" CASCADE;
  DROP TABLE "header_nav_items_children" CASCADE;
  DROP TABLE "header_nav_items_children_locales" CASCADE;
  DROP TABLE "header_nav_items" CASCADE;
  DROP TABLE "header_nav_items_locales" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "header_locales" CASCADE;
  DROP TABLE "header_rels" CASCADE;
  DROP TABLE "footer_columns_links" CASCADE;
  DROP TABLE "footer_columns_links_locales" CASCADE;
  DROP TABLE "footer_columns" CASCADE;
  DROP TABLE "footer_columns_locales" CASCADE;
  DROP TABLE "footer_bottom_links" CASCADE;
  DROP TABLE "footer_bottom_links_locales" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "footer_locales" CASCADE;
  DROP TABLE "footer_rels" CASCADE;
  DROP TABLE "email_settings_routing_contact_recipients" CASCADE;
  DROP TABLE "email_settings_routing_quote_recipients" CASCADE;
  DROP TABLE "email_settings_routing_careers_recipients" CASCADE;
  DROP TABLE "email_settings_routing_vendor_recipients" CASCADE;
  DROP TABLE "email_settings_routing_fallback_recipients" CASCADE;
  DROP TABLE "email_settings" CASCADE;
  DROP TABLE "integrations" CASCADE;
  DROP TABLE "careers_settings_stage_emails" CASCADE;
  DROP TABLE "careers_settings" CASCADE;
  DROP TABLE "careers_settings_locales" CASCADE;
  DROP TABLE "vendor_settings_document_types_required_for" CASCADE;
  DROP TABLE "vendor_settings_document_types" CASCADE;
  DROP TABLE "vendor_settings_document_types_locales" CASCADE;
  DROP TABLE "vendor_settings_categories" CASCADE;
  DROP TABLE "vendor_settings_categories_locales" CASCADE;
  DROP TABLE "vendor_settings_status_emails" CASCADE;
  DROP TABLE "vendor_settings" CASCADE;
  DROP TABLE "vendor_settings_locales" CASCADE;
  DROP TABLE "payload_jobs_stats" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_pages_hero_links_link_type";
  DROP TYPE "public"."enum_pages_hero_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_divisions_grid_variant";
  DROP TYPE "public"."enum_pages_blocks_divisions_grid_source";
  DROP TYPE "public"."enum_pages_blocks_divisions_grid_cta_card_link_type";
  DROP TYPE "public"."enum_pages_blocks_divisions_grid_background";
  DROP TYPE "public"."enum_pages_blocks_process_steps_variant";
  DROP TYPE "public"."enum_pages_blocks_process_steps_background";
  DROP TYPE "public"."enum_pages_blocks_feature_cards_cards_icon";
  DROP TYPE "public"."enum_pages_blocks_feature_cards_cards_tone";
  DROP TYPE "public"."enum_pages_blocks_feature_cards_cards_link_type";
  DROP TYPE "public"."enum_pages_blocks_feature_cards_variant";
  DROP TYPE "public"."enum_pages_blocks_feature_cards_columns";
  DROP TYPE "public"."enum_pages_blocks_feature_cards_background";
  DROP TYPE "public"."enum_pages_blocks_stats_variant";
  DROP TYPE "public"."enum_pages_blocks_stats_background";
  DROP TYPE "public"."enum_pages_blocks_logos_source";
  DROP TYPE "public"."enum_pages_blocks_logos_variant";
  DROP TYPE "public"."enum_pages_blocks_logos_background";
  DROP TYPE "public"."enum_pages_blocks_cta_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_cta_tone";
  DROP TYPE "public"."enum_pages_blocks_content_layout";
  DROP TYPE "public"."enum_pages_blocks_content_background";
  DROP TYPE "public"."enum_pages_blocks_chips_variant";
  DROP TYPE "public"."enum_pages_blocks_chips_background";
  DROP TYPE "public"."enum_pages_blocks_tabs_orientation";
  DROP TYPE "public"."enum_pages_blocks_tabs_background";
  DROP TYPE "public"."enum_pages_blocks_comparison_background";
  DROP TYPE "public"."enum_pages_blocks_faq_background";
  DROP TYPE "public"."enum_pages_blocks_downloads_background";
  DROP TYPE "public"."enum_pages_blocks_team_background";
  DROP TYPE "public"."enum_pages_blocks_media_block_size";
  DROP TYPE "public"."enum_pages_blocks_image_text_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_image_text_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_image_text_image_position";
  DROP TYPE "public"."enum_pages_blocks_image_text_background";
  DROP TYPE "public"."enum_pages_blocks_form_block_layout";
  DROP TYPE "public"."enum_pages_blocks_projects_source";
  DROP TYPE "public"."enum_pages_blocks_projects_background";
  DROP TYPE "public"."enum_pages_blocks_jobs_background";
  DROP TYPE "public"."enum_pages_blocks_list_panel_variant";
  DROP TYPE "public"."enum_pages_blocks_list_panel_background";
  DROP TYPE "public"."enum_pages_blocks_rfq_card_link_type";
  DROP TYPE "public"."enum_pages_hero_type";
  DROP TYPE "public"."enum_pages_hero_visual";
  DROP TYPE "public"."enum_pages_hero_pattern";
  DROP TYPE "public"."enum_pages_hero_illustration";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_version_hero_links_link_type";
  DROP TYPE "public"."enum__pages_v_version_hero_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_divisions_grid_variant";
  DROP TYPE "public"."enum__pages_v_blocks_divisions_grid_source";
  DROP TYPE "public"."enum__pages_v_blocks_divisions_grid_cta_card_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_divisions_grid_background";
  DROP TYPE "public"."enum__pages_v_blocks_process_steps_variant";
  DROP TYPE "public"."enum__pages_v_blocks_process_steps_background";
  DROP TYPE "public"."enum__pages_v_blocks_feature_cards_cards_icon";
  DROP TYPE "public"."enum__pages_v_blocks_feature_cards_cards_tone";
  DROP TYPE "public"."enum__pages_v_blocks_feature_cards_cards_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_feature_cards_variant";
  DROP TYPE "public"."enum__pages_v_blocks_feature_cards_columns";
  DROP TYPE "public"."enum__pages_v_blocks_feature_cards_background";
  DROP TYPE "public"."enum__pages_v_blocks_stats_variant";
  DROP TYPE "public"."enum__pages_v_blocks_stats_background";
  DROP TYPE "public"."enum__pages_v_blocks_logos_source";
  DROP TYPE "public"."enum__pages_v_blocks_logos_variant";
  DROP TYPE "public"."enum__pages_v_blocks_logos_background";
  DROP TYPE "public"."enum__pages_v_blocks_cta_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_cta_tone";
  DROP TYPE "public"."enum__pages_v_blocks_content_layout";
  DROP TYPE "public"."enum__pages_v_blocks_content_background";
  DROP TYPE "public"."enum__pages_v_blocks_chips_variant";
  DROP TYPE "public"."enum__pages_v_blocks_chips_background";
  DROP TYPE "public"."enum__pages_v_blocks_tabs_orientation";
  DROP TYPE "public"."enum__pages_v_blocks_tabs_background";
  DROP TYPE "public"."enum__pages_v_blocks_comparison_background";
  DROP TYPE "public"."enum__pages_v_blocks_faq_background";
  DROP TYPE "public"."enum__pages_v_blocks_downloads_background";
  DROP TYPE "public"."enum__pages_v_blocks_team_background";
  DROP TYPE "public"."enum__pages_v_blocks_media_block_size";
  DROP TYPE "public"."enum__pages_v_blocks_image_text_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_image_text_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_image_text_image_position";
  DROP TYPE "public"."enum__pages_v_blocks_image_text_background";
  DROP TYPE "public"."enum__pages_v_blocks_form_block_layout";
  DROP TYPE "public"."enum__pages_v_blocks_projects_source";
  DROP TYPE "public"."enum__pages_v_blocks_projects_background";
  DROP TYPE "public"."enum__pages_v_blocks_jobs_background";
  DROP TYPE "public"."enum__pages_v_blocks_list_panel_variant";
  DROP TYPE "public"."enum__pages_v_blocks_list_panel_background";
  DROP TYPE "public"."enum__pages_v_blocks_rfq_card_link_type";
  DROP TYPE "public"."enum__pages_v_version_hero_type";
  DROP TYPE "public"."enum__pages_v_version_hero_visual";
  DROP TYPE "public"."enum__pages_v_version_hero_pattern";
  DROP TYPE "public"."enum__pages_v_version_hero_illustration";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum__pages_v_published_locale";
  DROP TYPE "public"."enum_divisions_hero_links_link_type";
  DROP TYPE "public"."enum_divisions_hero_links_link_appearance";
  DROP TYPE "public"."enum_divisions_blocks_divisions_grid_variant";
  DROP TYPE "public"."enum_divisions_blocks_divisions_grid_source";
  DROP TYPE "public"."enum_divisions_blocks_divisions_grid_cta_card_link_type";
  DROP TYPE "public"."enum_divisions_blocks_divisions_grid_background";
  DROP TYPE "public"."enum_divisions_blocks_process_steps_variant";
  DROP TYPE "public"."enum_divisions_blocks_process_steps_background";
  DROP TYPE "public"."enum_divisions_blocks_feature_cards_cards_icon";
  DROP TYPE "public"."enum_divisions_blocks_feature_cards_cards_tone";
  DROP TYPE "public"."enum_divisions_blocks_feature_cards_cards_link_type";
  DROP TYPE "public"."enum_divisions_blocks_feature_cards_variant";
  DROP TYPE "public"."enum_divisions_blocks_feature_cards_columns";
  DROP TYPE "public"."enum_divisions_blocks_feature_cards_background";
  DROP TYPE "public"."enum_divisions_blocks_stats_variant";
  DROP TYPE "public"."enum_divisions_blocks_stats_background";
  DROP TYPE "public"."enum_divisions_blocks_logos_source";
  DROP TYPE "public"."enum_divisions_blocks_logos_variant";
  DROP TYPE "public"."enum_divisions_blocks_logos_background";
  DROP TYPE "public"."enum_divisions_blocks_cta_links_link_type";
  DROP TYPE "public"."enum_divisions_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum_divisions_blocks_cta_tone";
  DROP TYPE "public"."enum_divisions_blocks_content_layout";
  DROP TYPE "public"."enum_divisions_blocks_content_background";
  DROP TYPE "public"."enum_divisions_blocks_chips_variant";
  DROP TYPE "public"."enum_divisions_blocks_chips_background";
  DROP TYPE "public"."enum_divisions_blocks_tabs_orientation";
  DROP TYPE "public"."enum_divisions_blocks_tabs_background";
  DROP TYPE "public"."enum_divisions_blocks_comparison_background";
  DROP TYPE "public"."enum_divisions_blocks_faq_background";
  DROP TYPE "public"."enum_divisions_blocks_downloads_background";
  DROP TYPE "public"."enum_divisions_blocks_team_background";
  DROP TYPE "public"."enum_divisions_blocks_media_block_size";
  DROP TYPE "public"."enum_divisions_blocks_image_text_links_link_type";
  DROP TYPE "public"."enum_divisions_blocks_image_text_links_link_appearance";
  DROP TYPE "public"."enum_divisions_blocks_image_text_image_position";
  DROP TYPE "public"."enum_divisions_blocks_image_text_background";
  DROP TYPE "public"."enum_divisions_blocks_form_block_layout";
  DROP TYPE "public"."enum_divisions_blocks_projects_source";
  DROP TYPE "public"."enum_divisions_blocks_projects_background";
  DROP TYPE "public"."enum_divisions_blocks_jobs_background";
  DROP TYPE "public"."enum_divisions_blocks_list_panel_variant";
  DROP TYPE "public"."enum_divisions_blocks_list_panel_background";
  DROP TYPE "public"."enum_divisions_blocks_rfq_card_link_type";
  DROP TYPE "public"."enum_divisions_icon";
  DROP TYPE "public"."enum_divisions_hero_type";
  DROP TYPE "public"."enum_divisions_hero_visual";
  DROP TYPE "public"."enum_divisions_hero_pattern";
  DROP TYPE "public"."enum_divisions_hero_illustration";
  DROP TYPE "public"."enum_divisions_status";
  DROP TYPE "public"."enum__divisions_v_version_hero_links_link_type";
  DROP TYPE "public"."enum__divisions_v_version_hero_links_link_appearance";
  DROP TYPE "public"."enum__divisions_v_blocks_divisions_grid_variant";
  DROP TYPE "public"."enum__divisions_v_blocks_divisions_grid_source";
  DROP TYPE "public"."enum__divisions_v_blocks_divisions_grid_cta_card_link_type";
  DROP TYPE "public"."enum__divisions_v_blocks_divisions_grid_background";
  DROP TYPE "public"."enum__divisions_v_blocks_process_steps_variant";
  DROP TYPE "public"."enum__divisions_v_blocks_process_steps_background";
  DROP TYPE "public"."enum__divisions_v_blocks_feature_cards_cards_icon";
  DROP TYPE "public"."enum__divisions_v_blocks_feature_cards_cards_tone";
  DROP TYPE "public"."enum__divisions_v_blocks_feature_cards_cards_link_type";
  DROP TYPE "public"."enum__divisions_v_blocks_feature_cards_variant";
  DROP TYPE "public"."enum__divisions_v_blocks_feature_cards_columns";
  DROP TYPE "public"."enum__divisions_v_blocks_feature_cards_background";
  DROP TYPE "public"."enum__divisions_v_blocks_stats_variant";
  DROP TYPE "public"."enum__divisions_v_blocks_stats_background";
  DROP TYPE "public"."enum__divisions_v_blocks_logos_source";
  DROP TYPE "public"."enum__divisions_v_blocks_logos_variant";
  DROP TYPE "public"."enum__divisions_v_blocks_logos_background";
  DROP TYPE "public"."enum__divisions_v_blocks_cta_links_link_type";
  DROP TYPE "public"."enum__divisions_v_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum__divisions_v_blocks_cta_tone";
  DROP TYPE "public"."enum__divisions_v_blocks_content_layout";
  DROP TYPE "public"."enum__divisions_v_blocks_content_background";
  DROP TYPE "public"."enum__divisions_v_blocks_chips_variant";
  DROP TYPE "public"."enum__divisions_v_blocks_chips_background";
  DROP TYPE "public"."enum__divisions_v_blocks_tabs_orientation";
  DROP TYPE "public"."enum__divisions_v_blocks_tabs_background";
  DROP TYPE "public"."enum__divisions_v_blocks_comparison_background";
  DROP TYPE "public"."enum__divisions_v_blocks_faq_background";
  DROP TYPE "public"."enum__divisions_v_blocks_downloads_background";
  DROP TYPE "public"."enum__divisions_v_blocks_team_background";
  DROP TYPE "public"."enum__divisions_v_blocks_media_block_size";
  DROP TYPE "public"."enum__divisions_v_blocks_image_text_links_link_type";
  DROP TYPE "public"."enum__divisions_v_blocks_image_text_links_link_appearance";
  DROP TYPE "public"."enum__divisions_v_blocks_image_text_image_position";
  DROP TYPE "public"."enum__divisions_v_blocks_image_text_background";
  DROP TYPE "public"."enum__divisions_v_blocks_form_block_layout";
  DROP TYPE "public"."enum__divisions_v_blocks_projects_source";
  DROP TYPE "public"."enum__divisions_v_blocks_projects_background";
  DROP TYPE "public"."enum__divisions_v_blocks_jobs_background";
  DROP TYPE "public"."enum__divisions_v_blocks_list_panel_variant";
  DROP TYPE "public"."enum__divisions_v_blocks_list_panel_background";
  DROP TYPE "public"."enum__divisions_v_blocks_rfq_card_link_type";
  DROP TYPE "public"."enum__divisions_v_version_icon";
  DROP TYPE "public"."enum__divisions_v_version_hero_type";
  DROP TYPE "public"."enum__divisions_v_version_hero_visual";
  DROP TYPE "public"."enum__divisions_v_version_hero_pattern";
  DROP TYPE "public"."enum__divisions_v_version_hero_illustration";
  DROP TYPE "public"."enum__divisions_v_version_status";
  DROP TYPE "public"."enum__divisions_v_published_locale";
  DROP TYPE "public"."enum_projects_status";
  DROP TYPE "public"."enum__projects_v_version_status";
  DROP TYPE "public"."enum__projects_v_published_locale";
  DROP TYPE "public"."enum_news_category";
  DROP TYPE "public"."enum_news_status";
  DROP TYPE "public"."enum__news_v_version_category";
  DROP TYPE "public"."enum__news_v_version_status";
  DROP TYPE "public"."enum__news_v_published_locale";
  DROP TYPE "public"."enum_partners_type";
  DROP TYPE "public"."enum_documents_category";
  DROP TYPE "public"."enum_reusable_blocks_blocks_divisions_grid_variant";
  DROP TYPE "public"."enum_reusable_blocks_blocks_divisions_grid_source";
  DROP TYPE "public"."enum_reusable_blocks_blocks_divisions_grid_cta_card_link_type";
  DROP TYPE "public"."enum_reusable_blocks_blocks_divisions_grid_background";
  DROP TYPE "public"."enum_reusable_blocks_blocks_process_steps_variant";
  DROP TYPE "public"."enum_reusable_blocks_blocks_process_steps_background";
  DROP TYPE "public"."enum_reusable_blocks_blocks_feature_cards_cards_icon";
  DROP TYPE "public"."enum_reusable_blocks_blocks_feature_cards_cards_tone";
  DROP TYPE "public"."enum_reusable_blocks_blocks_feature_cards_cards_link_type";
  DROP TYPE "public"."enum_reusable_blocks_blocks_feature_cards_variant";
  DROP TYPE "public"."enum_reusable_blocks_blocks_feature_cards_columns";
  DROP TYPE "public"."enum_reusable_blocks_blocks_feature_cards_background";
  DROP TYPE "public"."enum_reusable_blocks_blocks_stats_variant";
  DROP TYPE "public"."enum_reusable_blocks_blocks_stats_background";
  DROP TYPE "public"."enum_reusable_blocks_blocks_logos_source";
  DROP TYPE "public"."enum_reusable_blocks_blocks_logos_variant";
  DROP TYPE "public"."enum_reusable_blocks_blocks_logos_background";
  DROP TYPE "public"."enum_reusable_blocks_blocks_cta_links_link_type";
  DROP TYPE "public"."enum_reusable_blocks_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum_reusable_blocks_blocks_cta_tone";
  DROP TYPE "public"."enum_reusable_blocks_blocks_content_layout";
  DROP TYPE "public"."enum_reusable_blocks_blocks_content_background";
  DROP TYPE "public"."enum_reusable_blocks_blocks_chips_variant";
  DROP TYPE "public"."enum_reusable_blocks_blocks_chips_background";
  DROP TYPE "public"."enum_reusable_blocks_blocks_tabs_orientation";
  DROP TYPE "public"."enum_reusable_blocks_blocks_tabs_background";
  DROP TYPE "public"."enum_reusable_blocks_blocks_comparison_background";
  DROP TYPE "public"."enum_reusable_blocks_blocks_faq_background";
  DROP TYPE "public"."enum_reusable_blocks_blocks_downloads_background";
  DROP TYPE "public"."enum_reusable_blocks_blocks_team_background";
  DROP TYPE "public"."enum_reusable_blocks_blocks_media_block_size";
  DROP TYPE "public"."enum_reusable_blocks_blocks_image_text_links_link_type";
  DROP TYPE "public"."enum_reusable_blocks_blocks_image_text_links_link_appearance";
  DROP TYPE "public"."enum_reusable_blocks_blocks_image_text_image_position";
  DROP TYPE "public"."enum_reusable_blocks_blocks_image_text_background";
  DROP TYPE "public"."enum_reusable_blocks_blocks_form_block_layout";
  DROP TYPE "public"."enum_reusable_blocks_blocks_projects_source";
  DROP TYPE "public"."enum_reusable_blocks_blocks_projects_background";
  DROP TYPE "public"."enum_reusable_blocks_blocks_jobs_background";
  DROP TYPE "public"."enum_reusable_blocks_blocks_list_panel_variant";
  DROP TYPE "public"."enum_reusable_blocks_blocks_list_panel_background";
  DROP TYPE "public"."enum_reusable_blocks_blocks_rfq_card_link_type";
  DROP TYPE "public"."enum_job_openings_skills_weight";
  DROP TYPE "public"."enum_job_openings_screening_questions_type";
  DROP TYPE "public"."enum_job_openings_screening_questions_weight";
  DROP TYPE "public"."enum_job_openings_employment_type";
  DROP TYPE "public"."enum_job_openings_workplace";
  DROP TYPE "public"."enum_job_openings_education_level";
  DROP TYPE "public"."enum_job_openings_status";
  DROP TYPE "public"."enum_applications_tags";
  DROP TYPE "public"."enum_applications_education_level";
  DROP TYPE "public"."enum_applications_notice_period";
  DROP TYPE "public"."enum_applications_stage";
  DROP TYPE "public"."enum_applications_rejection_reason";
  DROP TYPE "public"."enum_applications_match_band";
  DROP TYPE "public"."enum_applications_rating";
  DROP TYPE "public"."enum_vendors_regions";
  DROP TYPE "public"."enum_vendors_certifications";
  DROP TYPE "public"."enum_vendors_documents_review_status";
  DROP TYPE "public"."enum_vendors_status_history_status";
  DROP TYPE "public"."enum_vendors_vendor_type";
  DROP TYPE "public"."enum_vendors_employees";
  DROP TYPE "public"."enum_vendors_nitaqat";
  DROP TYPE "public"."enum_vendors_turnover_band";
  DROP TYPE "public"."enum_vendors_payment_terms";
  DROP TYPE "public"."enum_vendors_status";
  DROP TYPE "public"."enum_vendors_risk_rating";
  DROP TYPE "public"."enum_users_roles";
  DROP TYPE "public"."enum_email_logs_status";
  DROP TYPE "public"."enum_audit_logs_action";
  DROP TYPE "public"."enum_redirects_to_type";
  DROP TYPE "public"."enum_redirects_type";
  DROP TYPE "public"."enum_forms_blocks_choices_source";
  DROP TYPE "public"."enum_forms_confirmation_type";
  DROP TYPE "public"."enum_forms_notify_inbox";
  DROP TYPE "public"."enum_forms_analytics_event";
  DROP TYPE "public"."enum_form_submissions_status";
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_task_slug";
  DROP TYPE "public"."enum_payload_folders_folder_type";
  DROP TYPE "public"."enum_site_settings_social_profiles_platform";
  DROP TYPE "public"."enum_site_settings_announcement_tone";
  DROP TYPE "public"."enum_header_top_bar_extra_links_link_type";
  DROP TYPE "public"."enum_header_nav_items_children_link_type";
  DROP TYPE "public"."enum_header_nav_items_link_type";
  DROP TYPE "public"."enum_header_nav_items_dropdown";
  DROP TYPE "public"."enum_header_top_bar_vendor_button_link_type";
  DROP TYPE "public"."enum_header_cta_link_type";
  DROP TYPE "public"."enum_footer_columns_links_link_type";
  DROP TYPE "public"."enum_footer_columns_source";
  DROP TYPE "public"."enum_footer_bottom_links_link_type";
  DROP TYPE "public"."enum_email_settings_smtp_security";
  DROP TYPE "public"."enum_integrations_ai_provider";
  DROP TYPE "public"."enum_careers_settings_stage_emails_stage";
  DROP TYPE "public"."enum_vendor_settings_document_types_required_for";
  DROP TYPE "public"."enum_vendor_settings_status_emails_status";`)
}
