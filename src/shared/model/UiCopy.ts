import type { NavigationCopy } from 'src/shared/config';
import type { SupportedLocale } from './LocaleService';
import uiCopyByLocaleData from './UiCopy.data.json';

export type SourceSchemaLinkId = 'classesSchema' | 'cmsDraft' | 'regionsSchema' | 'regionsTable';

export interface SourceSchemaLinkCopy {
  readonly description: string;
  readonly label: string;
}

export interface UiCopy {
  readonly navigation: NavigationCopy;
  readonly appShell: {
    readonly brandHomeAria: string;
    readonly closePrimaryNavigation: string;
    readonly currentLanguageBadge: string;
    readonly footerBadge: string;
    readonly footerLinkLabel: string;
    readonly footerText: string;
    readonly languageAriaLabelPrefix: string;
    readonly openPrimaryNavigation: string;
    readonly primaryNavigation: string;
    readonly primaryNavigationDialog: string;
    readonly skipToContent: string;
    readonly sourceSchemaTriggerAria: string;
  };
  readonly sourceSchema: {
    readonly menuDescription: string;
    readonly menuTitle: string;
    readonly links: Record<SourceSchemaLinkId, SourceSchemaLinkCopy>;
  };
  readonly shared: {
    readonly codePanelHide: string;
    readonly codePanelShow: string;
    readonly loadingEllipsis: string;
    readonly resultSummaryOf: string;
    readonly resultSummaryShowing: string;
    readonly retry: string;
  };
  readonly explainer: {
    readonly cloudRow: string;
    readonly cloudSchema: string;
    readonly cloudTable: string;
    readonly closeAria: string;
    readonly federation: string;
    readonly federationSdl: string;
    readonly fieldAttribution: string;
    readonly heading: string;
    readonly howThisUsesRevisium: string;
    readonly loadingResponse: string;
    readonly localeFallbacks: string;
    readonly mcpTool: string;
    readonly openApi: string;
    readonly openAria: string;
    readonly responseSample: string;
    readonly sourceView: string;
    readonly referenceBadge: string;
    readonly revisiumCloud: string;
    readonly variables: string;
  };
}

export const uiCopyByLocale = uiCopyByLocaleData as Record<SupportedLocale, UiCopy>;
