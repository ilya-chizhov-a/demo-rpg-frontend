import { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: number | string; output: number | string; }
  JSON: { input: unknown; output: unknown; }
};

export type Demo_Rpg_CmsBlog_AuthorsesWhereInput = {
  AND?: InputMaybe<Array<Demo_Rpg_CmsBlog_AuthorsesWhereInput>>;
  NOT?: InputMaybe<Array<Demo_Rpg_CmsBlog_AuthorsesWhereInput>>;
  OR?: InputMaybe<Array<Demo_Rpg_CmsBlog_AuthorsesWhereInput>>;
  createdAt?: InputMaybe<Demo_Rpg_CmsDateTimeFilter>;
  createdId?: InputMaybe<Demo_Rpg_CmsStringFilter>;
  data?: InputMaybe<Demo_Rpg_CmsJsonFilter>;
  id?: InputMaybe<Demo_Rpg_CmsStringFilter>;
  publishedAt?: InputMaybe<Demo_Rpg_CmsDateTimeFilter>;
  readonly?: InputMaybe<Demo_Rpg_CmsBoolFilter>;
  updatedAt?: InputMaybe<Demo_Rpg_CmsDateTimeFilter>;
  versionId?: InputMaybe<Demo_Rpg_CmsStringFilter>;
};

export type Demo_Rpg_CmsBlog_PostsesWhereInput = {
  AND?: InputMaybe<Array<Demo_Rpg_CmsBlog_PostsesWhereInput>>;
  NOT?: InputMaybe<Array<Demo_Rpg_CmsBlog_PostsesWhereInput>>;
  OR?: InputMaybe<Array<Demo_Rpg_CmsBlog_PostsesWhereInput>>;
  createdAt?: InputMaybe<Demo_Rpg_CmsDateTimeFilter>;
  createdId?: InputMaybe<Demo_Rpg_CmsStringFilter>;
  data?: InputMaybe<Demo_Rpg_CmsJsonFilter>;
  id?: InputMaybe<Demo_Rpg_CmsStringFilter>;
  publishedAt?: InputMaybe<Demo_Rpg_CmsDateTimeFilter>;
  readonly?: InputMaybe<Demo_Rpg_CmsBoolFilter>;
  updatedAt?: InputMaybe<Demo_Rpg_CmsDateTimeFilter>;
  versionId?: InputMaybe<Demo_Rpg_CmsStringFilter>;
};

export type Demo_Rpg_CmsBoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Demo_Rpg_CmsDateTimeFilter = {
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
};

export enum Demo_Rpg_CmsFilterJsonMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export enum Demo_Rpg_CmsFilterStringMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export type Demo_Rpg_CmsGetBlog_AuthorsesInput = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Demo_Rpg_CmsGetBlog_AuthorsesOrderByInput>>;
  where?: InputMaybe<Demo_Rpg_CmsBlog_AuthorsesWhereInput>;
};

export enum Demo_Rpg_CmsGetBlog_AuthorsesOrderByField {
  CreatedAt = 'createdAt',
  Data = 'data',
  Id = 'id',
  PublishedAt = 'publishedAt',
  UpdatedAt = 'updatedAt'
}

export type Demo_Rpg_CmsGetBlog_AuthorsesOrderByInput = {
  aggregation?: InputMaybe<Demo_Rpg_CmsOrderFieldAggregation>;
  direction: Demo_Rpg_CmsSortOrder;
  field: Demo_Rpg_CmsGetBlog_AuthorsesOrderByField;
  path?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Demo_Rpg_CmsOrderFieldType>;
};

export type Demo_Rpg_CmsGetBlog_PostsesInput = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Demo_Rpg_CmsGetBlog_PostsesOrderByInput>>;
  where?: InputMaybe<Demo_Rpg_CmsBlog_PostsesWhereInput>;
};

export enum Demo_Rpg_CmsGetBlog_PostsesOrderByField {
  CreatedAt = 'createdAt',
  Data = 'data',
  Id = 'id',
  PublishedAt = 'publishedAt',
  UpdatedAt = 'updatedAt'
}

export type Demo_Rpg_CmsGetBlog_PostsesOrderByInput = {
  aggregation?: InputMaybe<Demo_Rpg_CmsOrderFieldAggregation>;
  direction: Demo_Rpg_CmsSortOrder;
  field: Demo_Rpg_CmsGetBlog_PostsesOrderByField;
  path?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Demo_Rpg_CmsOrderFieldType>;
};

export type Demo_Rpg_CmsGetLanding_FeaturesesInput = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Demo_Rpg_CmsGetLanding_FeaturesesOrderByInput>>;
  where?: InputMaybe<Demo_Rpg_CmsLanding_FeaturesesWhereInput>;
};

export enum Demo_Rpg_CmsGetLanding_FeaturesesOrderByField {
  CreatedAt = 'createdAt',
  Data = 'data',
  Id = 'id',
  PublishedAt = 'publishedAt',
  UpdatedAt = 'updatedAt'
}

export type Demo_Rpg_CmsGetLanding_FeaturesesOrderByInput = {
  aggregation?: InputMaybe<Demo_Rpg_CmsOrderFieldAggregation>;
  direction: Demo_Rpg_CmsSortOrder;
  field: Demo_Rpg_CmsGetLanding_FeaturesesOrderByField;
  path?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Demo_Rpg_CmsOrderFieldType>;
};

export type Demo_Rpg_CmsGetLanding_HerosInput = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Demo_Rpg_CmsGetLanding_HerosOrderByInput>>;
  where?: InputMaybe<Demo_Rpg_CmsLanding_HerosWhereInput>;
};

export enum Demo_Rpg_CmsGetLanding_HerosOrderByField {
  CreatedAt = 'createdAt',
  Data = 'data',
  Id = 'id',
  PublishedAt = 'publishedAt',
  UpdatedAt = 'updatedAt'
}

export type Demo_Rpg_CmsGetLanding_HerosOrderByInput = {
  aggregation?: InputMaybe<Demo_Rpg_CmsOrderFieldAggregation>;
  direction: Demo_Rpg_CmsSortOrder;
  field: Demo_Rpg_CmsGetLanding_HerosOrderByField;
  path?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Demo_Rpg_CmsOrderFieldType>;
};

export type Demo_Rpg_CmsGetLanding_TestimonialsesInput = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Demo_Rpg_CmsGetLanding_TestimonialsesOrderByInput>>;
  where?: InputMaybe<Demo_Rpg_CmsLanding_TestimonialsesWhereInput>;
};

export enum Demo_Rpg_CmsGetLanding_TestimonialsesOrderByField {
  CreatedAt = 'createdAt',
  Data = 'data',
  Id = 'id',
  PublishedAt = 'publishedAt',
  UpdatedAt = 'updatedAt'
}

export type Demo_Rpg_CmsGetLanding_TestimonialsesOrderByInput = {
  aggregation?: InputMaybe<Demo_Rpg_CmsOrderFieldAggregation>;
  direction: Demo_Rpg_CmsSortOrder;
  field: Demo_Rpg_CmsGetLanding_TestimonialsesOrderByField;
  path?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Demo_Rpg_CmsOrderFieldType>;
};

export type Demo_Rpg_CmsJsonFilter = {
  array_contains?: InputMaybe<Array<Scalars['JSON']['input']>>;
  array_ends_with?: InputMaybe<Scalars['JSON']['input']>;
  array_starts_with?: InputMaybe<Scalars['JSON']['input']>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  mode?: InputMaybe<Demo_Rpg_CmsFilterJsonMode>;
  path?: InputMaybe<Scalars['JSON']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  searchLanguage?: InputMaybe<Demo_Rpg_CmsSearchLanguage>;
  searchType?: InputMaybe<Demo_Rpg_CmsSearchType>;
  string_contains?: InputMaybe<Scalars['String']['input']>;
  string_ends_with?: InputMaybe<Scalars['String']['input']>;
  string_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type Demo_Rpg_CmsLanding_FeaturesesWhereInput = {
  AND?: InputMaybe<Array<Demo_Rpg_CmsLanding_FeaturesesWhereInput>>;
  NOT?: InputMaybe<Array<Demo_Rpg_CmsLanding_FeaturesesWhereInput>>;
  OR?: InputMaybe<Array<Demo_Rpg_CmsLanding_FeaturesesWhereInput>>;
  createdAt?: InputMaybe<Demo_Rpg_CmsDateTimeFilter>;
  createdId?: InputMaybe<Demo_Rpg_CmsStringFilter>;
  data?: InputMaybe<Demo_Rpg_CmsJsonFilter>;
  id?: InputMaybe<Demo_Rpg_CmsStringFilter>;
  publishedAt?: InputMaybe<Demo_Rpg_CmsDateTimeFilter>;
  readonly?: InputMaybe<Demo_Rpg_CmsBoolFilter>;
  updatedAt?: InputMaybe<Demo_Rpg_CmsDateTimeFilter>;
  versionId?: InputMaybe<Demo_Rpg_CmsStringFilter>;
};

export type Demo_Rpg_CmsLanding_HerosWhereInput = {
  AND?: InputMaybe<Array<Demo_Rpg_CmsLanding_HerosWhereInput>>;
  NOT?: InputMaybe<Array<Demo_Rpg_CmsLanding_HerosWhereInput>>;
  OR?: InputMaybe<Array<Demo_Rpg_CmsLanding_HerosWhereInput>>;
  createdAt?: InputMaybe<Demo_Rpg_CmsDateTimeFilter>;
  createdId?: InputMaybe<Demo_Rpg_CmsStringFilter>;
  data?: InputMaybe<Demo_Rpg_CmsJsonFilter>;
  id?: InputMaybe<Demo_Rpg_CmsStringFilter>;
  publishedAt?: InputMaybe<Demo_Rpg_CmsDateTimeFilter>;
  readonly?: InputMaybe<Demo_Rpg_CmsBoolFilter>;
  updatedAt?: InputMaybe<Demo_Rpg_CmsDateTimeFilter>;
  versionId?: InputMaybe<Demo_Rpg_CmsStringFilter>;
};

export type Demo_Rpg_CmsLanding_TestimonialsesWhereInput = {
  AND?: InputMaybe<Array<Demo_Rpg_CmsLanding_TestimonialsesWhereInput>>;
  NOT?: InputMaybe<Array<Demo_Rpg_CmsLanding_TestimonialsesWhereInput>>;
  OR?: InputMaybe<Array<Demo_Rpg_CmsLanding_TestimonialsesWhereInput>>;
  createdAt?: InputMaybe<Demo_Rpg_CmsDateTimeFilter>;
  createdId?: InputMaybe<Demo_Rpg_CmsStringFilter>;
  data?: InputMaybe<Demo_Rpg_CmsJsonFilter>;
  id?: InputMaybe<Demo_Rpg_CmsStringFilter>;
  publishedAt?: InputMaybe<Demo_Rpg_CmsDateTimeFilter>;
  readonly?: InputMaybe<Demo_Rpg_CmsBoolFilter>;
  updatedAt?: InputMaybe<Demo_Rpg_CmsDateTimeFilter>;
  versionId?: InputMaybe<Demo_Rpg_CmsStringFilter>;
};

export enum Demo_Rpg_CmsOrderFieldAggregation {
  Avg = 'avg',
  First = 'first',
  Last = 'last',
  Max = 'max',
  Min = 'min'
}

export enum Demo_Rpg_CmsOrderFieldType {
  Boolean = 'boolean',
  Float = 'float',
  Int = 'int',
  Text = 'text',
  Timestamp = 'timestamp'
}

export enum Demo_Rpg_CmsSearchLanguage {
  Arabic = 'arabic',
  Armenian = 'armenian',
  Basque = 'basque',
  Catalan = 'catalan',
  Danish = 'danish',
  Dutch = 'dutch',
  English = 'english',
  Finnish = 'finnish',
  French = 'french',
  German = 'german',
  Greek = 'greek',
  Hindi = 'hindi',
  Hungarian = 'hungarian',
  Indonesian = 'indonesian',
  Irish = 'irish',
  Italian = 'italian',
  Lithuanian = 'lithuanian',
  Nepali = 'nepali',
  Norwegian = 'norwegian',
  Portuguese = 'portuguese',
  Romanian = 'romanian',
  Russian = 'russian',
  Serbian = 'serbian',
  Simple = 'simple',
  Spanish = 'spanish',
  Swedish = 'swedish',
  Tamil = 'tamil',
  Turkish = 'turkish',
  Yiddish = 'yiddish'
}

export enum Demo_Rpg_CmsSearchType {
  Phrase = 'phrase',
  Plain = 'plain',
  Prefix = 'prefix',
  Tsquery = 'tsquery'
}

export enum Demo_Rpg_CmsSortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type Demo_Rpg_CmsStringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  mode?: InputMaybe<Demo_Rpg_CmsFilterStringMode>;
  not?: InputMaybe<Scalars['String']['input']>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type Demo_Rpg_DataAbilitiesesWhereInput = {
  AND?: InputMaybe<Array<Demo_Rpg_DataAbilitiesesWhereInput>>;
  NOT?: InputMaybe<Array<Demo_Rpg_DataAbilitiesesWhereInput>>;
  OR?: InputMaybe<Array<Demo_Rpg_DataAbilitiesesWhereInput>>;
  createdAt?: InputMaybe<Demo_Rpg_DataDateTimeFilter>;
  createdId?: InputMaybe<Demo_Rpg_DataStringFilter>;
  data?: InputMaybe<Demo_Rpg_DataJsonFilter>;
  id?: InputMaybe<Demo_Rpg_DataStringFilter>;
  publishedAt?: InputMaybe<Demo_Rpg_DataDateTimeFilter>;
  readonly?: InputMaybe<Demo_Rpg_DataBoolFilter>;
  updatedAt?: InputMaybe<Demo_Rpg_DataDateTimeFilter>;
  versionId?: InputMaybe<Demo_Rpg_DataStringFilter>;
};

export type Demo_Rpg_DataBoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Demo_Rpg_DataClassesesWhereInput = {
  AND?: InputMaybe<Array<Demo_Rpg_DataClassesesWhereInput>>;
  NOT?: InputMaybe<Array<Demo_Rpg_DataClassesesWhereInput>>;
  OR?: InputMaybe<Array<Demo_Rpg_DataClassesesWhereInput>>;
  createdAt?: InputMaybe<Demo_Rpg_DataDateTimeFilter>;
  createdId?: InputMaybe<Demo_Rpg_DataStringFilter>;
  data?: InputMaybe<Demo_Rpg_DataJsonFilter>;
  id?: InputMaybe<Demo_Rpg_DataStringFilter>;
  publishedAt?: InputMaybe<Demo_Rpg_DataDateTimeFilter>;
  readonly?: InputMaybe<Demo_Rpg_DataBoolFilter>;
  updatedAt?: InputMaybe<Demo_Rpg_DataDateTimeFilter>;
  versionId?: InputMaybe<Demo_Rpg_DataStringFilter>;
};

export type Demo_Rpg_DataDateTimeFilter = {
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type Demo_Rpg_DataDialogsesWhereInput = {
  AND?: InputMaybe<Array<Demo_Rpg_DataDialogsesWhereInput>>;
  NOT?: InputMaybe<Array<Demo_Rpg_DataDialogsesWhereInput>>;
  OR?: InputMaybe<Array<Demo_Rpg_DataDialogsesWhereInput>>;
  createdAt?: InputMaybe<Demo_Rpg_DataDateTimeFilter>;
  createdId?: InputMaybe<Demo_Rpg_DataStringFilter>;
  data?: InputMaybe<Demo_Rpg_DataJsonFilter>;
  id?: InputMaybe<Demo_Rpg_DataStringFilter>;
  publishedAt?: InputMaybe<Demo_Rpg_DataDateTimeFilter>;
  readonly?: InputMaybe<Demo_Rpg_DataBoolFilter>;
  updatedAt?: InputMaybe<Demo_Rpg_DataDateTimeFilter>;
  versionId?: InputMaybe<Demo_Rpg_DataStringFilter>;
};

export type Demo_Rpg_DataEffectsesWhereInput = {
  AND?: InputMaybe<Array<Demo_Rpg_DataEffectsesWhereInput>>;
  NOT?: InputMaybe<Array<Demo_Rpg_DataEffectsesWhereInput>>;
  OR?: InputMaybe<Array<Demo_Rpg_DataEffectsesWhereInput>>;
  createdAt?: InputMaybe<Demo_Rpg_DataDateTimeFilter>;
  createdId?: InputMaybe<Demo_Rpg_DataStringFilter>;
  data?: InputMaybe<Demo_Rpg_DataJsonFilter>;
  id?: InputMaybe<Demo_Rpg_DataStringFilter>;
  publishedAt?: InputMaybe<Demo_Rpg_DataDateTimeFilter>;
  readonly?: InputMaybe<Demo_Rpg_DataBoolFilter>;
  updatedAt?: InputMaybe<Demo_Rpg_DataDateTimeFilter>;
  versionId?: InputMaybe<Demo_Rpg_DataStringFilter>;
};

export type Demo_Rpg_DataFactionsesWhereInput = {
  AND?: InputMaybe<Array<Demo_Rpg_DataFactionsesWhereInput>>;
  NOT?: InputMaybe<Array<Demo_Rpg_DataFactionsesWhereInput>>;
  OR?: InputMaybe<Array<Demo_Rpg_DataFactionsesWhereInput>>;
  createdAt?: InputMaybe<Demo_Rpg_DataDateTimeFilter>;
  createdId?: InputMaybe<Demo_Rpg_DataStringFilter>;
  data?: InputMaybe<Demo_Rpg_DataJsonFilter>;
  id?: InputMaybe<Demo_Rpg_DataStringFilter>;
  publishedAt?: InputMaybe<Demo_Rpg_DataDateTimeFilter>;
  readonly?: InputMaybe<Demo_Rpg_DataBoolFilter>;
  updatedAt?: InputMaybe<Demo_Rpg_DataDateTimeFilter>;
  versionId?: InputMaybe<Demo_Rpg_DataStringFilter>;
};

export enum Demo_Rpg_DataFilterJsonMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export enum Demo_Rpg_DataFilterStringMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export type Demo_Rpg_DataGetAbilitiesesInput = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Demo_Rpg_DataGetAbilitiesesOrderByInput>>;
  where?: InputMaybe<Demo_Rpg_DataAbilitiesesWhereInput>;
};

export enum Demo_Rpg_DataGetAbilitiesesOrderByField {
  CreatedAt = 'createdAt',
  Data = 'data',
  Id = 'id',
  PublishedAt = 'publishedAt',
  UpdatedAt = 'updatedAt'
}

export type Demo_Rpg_DataGetAbilitiesesOrderByInput = {
  aggregation?: InputMaybe<Demo_Rpg_DataOrderFieldAggregation>;
  direction: Demo_Rpg_DataSortOrder;
  field: Demo_Rpg_DataGetAbilitiesesOrderByField;
  path?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Demo_Rpg_DataOrderFieldType>;
};

export type Demo_Rpg_DataGetClassesesInput = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Demo_Rpg_DataGetClassesesOrderByInput>>;
  where?: InputMaybe<Demo_Rpg_DataClassesesWhereInput>;
};

export enum Demo_Rpg_DataGetClassesesOrderByField {
  CreatedAt = 'createdAt',
  Data = 'data',
  Id = 'id',
  PublishedAt = 'publishedAt',
  UpdatedAt = 'updatedAt'
}

export type Demo_Rpg_DataGetClassesesOrderByInput = {
  aggregation?: InputMaybe<Demo_Rpg_DataOrderFieldAggregation>;
  direction: Demo_Rpg_DataSortOrder;
  field: Demo_Rpg_DataGetClassesesOrderByField;
  path?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Demo_Rpg_DataOrderFieldType>;
};

export type Demo_Rpg_DataGetDialogsesInput = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Demo_Rpg_DataGetDialogsesOrderByInput>>;
  where?: InputMaybe<Demo_Rpg_DataDialogsesWhereInput>;
};

export enum Demo_Rpg_DataGetDialogsesOrderByField {
  CreatedAt = 'createdAt',
  Data = 'data',
  Id = 'id',
  PublishedAt = 'publishedAt',
  UpdatedAt = 'updatedAt'
}

export type Demo_Rpg_DataGetDialogsesOrderByInput = {
  aggregation?: InputMaybe<Demo_Rpg_DataOrderFieldAggregation>;
  direction: Demo_Rpg_DataSortOrder;
  field: Demo_Rpg_DataGetDialogsesOrderByField;
  path?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Demo_Rpg_DataOrderFieldType>;
};

export type Demo_Rpg_DataGetEffectsesInput = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Demo_Rpg_DataGetEffectsesOrderByInput>>;
  where?: InputMaybe<Demo_Rpg_DataEffectsesWhereInput>;
};

export enum Demo_Rpg_DataGetEffectsesOrderByField {
  CreatedAt = 'createdAt',
  Data = 'data',
  Id = 'id',
  PublishedAt = 'publishedAt',
  UpdatedAt = 'updatedAt'
}

export type Demo_Rpg_DataGetEffectsesOrderByInput = {
  aggregation?: InputMaybe<Demo_Rpg_DataOrderFieldAggregation>;
  direction: Demo_Rpg_DataSortOrder;
  field: Demo_Rpg_DataGetEffectsesOrderByField;
  path?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Demo_Rpg_DataOrderFieldType>;
};

export type Demo_Rpg_DataGetFactionsesInput = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Demo_Rpg_DataGetFactionsesOrderByInput>>;
  where?: InputMaybe<Demo_Rpg_DataFactionsesWhereInput>;
};

export enum Demo_Rpg_DataGetFactionsesOrderByField {
  CreatedAt = 'createdAt',
  Data = 'data',
  Id = 'id',
  PublishedAt = 'publishedAt',
  UpdatedAt = 'updatedAt'
}

export type Demo_Rpg_DataGetFactionsesOrderByInput = {
  aggregation?: InputMaybe<Demo_Rpg_DataOrderFieldAggregation>;
  direction: Demo_Rpg_DataSortOrder;
  field: Demo_Rpg_DataGetFactionsesOrderByField;
  path?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Demo_Rpg_DataOrderFieldType>;
};

export type Demo_Rpg_DataGetHeroesesInput = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Demo_Rpg_DataGetHeroesesOrderByInput>>;
  where?: InputMaybe<Demo_Rpg_DataHeroesesWhereInput>;
};

export enum Demo_Rpg_DataGetHeroesesOrderByField {
  CreatedAt = 'createdAt',
  Data = 'data',
  Id = 'id',
  PublishedAt = 'publishedAt',
  UpdatedAt = 'updatedAt'
}

export type Demo_Rpg_DataGetHeroesesOrderByInput = {
  aggregation?: InputMaybe<Demo_Rpg_DataOrderFieldAggregation>;
  direction: Demo_Rpg_DataSortOrder;
  field: Demo_Rpg_DataGetHeroesesOrderByField;
  path?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Demo_Rpg_DataOrderFieldType>;
};

export type Demo_Rpg_DataGetItem_TypesesInput = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Demo_Rpg_DataGetItem_TypesesOrderByInput>>;
  where?: InputMaybe<Demo_Rpg_DataItem_TypesesWhereInput>;
};

export enum Demo_Rpg_DataGetItem_TypesesOrderByField {
  CreatedAt = 'createdAt',
  Data = 'data',
  Id = 'id',
  PublishedAt = 'publishedAt',
  UpdatedAt = 'updatedAt'
}

export type Demo_Rpg_DataGetItem_TypesesOrderByInput = {
  aggregation?: InputMaybe<Demo_Rpg_DataOrderFieldAggregation>;
  direction: Demo_Rpg_DataSortOrder;
  field: Demo_Rpg_DataGetItem_TypesesOrderByField;
  path?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Demo_Rpg_DataOrderFieldType>;
};

export type Demo_Rpg_DataGetItemsesInput = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Demo_Rpg_DataGetItemsesOrderByInput>>;
  where?: InputMaybe<Demo_Rpg_DataItemsesWhereInput>;
};

export enum Demo_Rpg_DataGetItemsesOrderByField {
  CreatedAt = 'createdAt',
  Data = 'data',
  Id = 'id',
  PublishedAt = 'publishedAt',
  UpdatedAt = 'updatedAt'
}

export type Demo_Rpg_DataGetItemsesOrderByInput = {
  aggregation?: InputMaybe<Demo_Rpg_DataOrderFieldAggregation>;
  direction: Demo_Rpg_DataSortOrder;
  field: Demo_Rpg_DataGetItemsesOrderByField;
  path?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Demo_Rpg_DataOrderFieldType>;
};

export type Demo_Rpg_DataGetLocationsesInput = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Demo_Rpg_DataGetLocationsesOrderByInput>>;
  where?: InputMaybe<Demo_Rpg_DataLocationsesWhereInput>;
};

export enum Demo_Rpg_DataGetLocationsesOrderByField {
  CreatedAt = 'createdAt',
  Data = 'data',
  Id = 'id',
  PublishedAt = 'publishedAt',
  UpdatedAt = 'updatedAt'
}

export type Demo_Rpg_DataGetLocationsesOrderByInput = {
  aggregation?: InputMaybe<Demo_Rpg_DataOrderFieldAggregation>;
  direction: Demo_Rpg_DataSortOrder;
  field: Demo_Rpg_DataGetLocationsesOrderByField;
  path?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Demo_Rpg_DataOrderFieldType>;
};

export type Demo_Rpg_DataGetMonstersesInput = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Demo_Rpg_DataGetMonstersesOrderByInput>>;
  where?: InputMaybe<Demo_Rpg_DataMonstersesWhereInput>;
};

export enum Demo_Rpg_DataGetMonstersesOrderByField {
  CreatedAt = 'createdAt',
  Data = 'data',
  Id = 'id',
  PublishedAt = 'publishedAt',
  UpdatedAt = 'updatedAt'
}

export type Demo_Rpg_DataGetMonstersesOrderByInput = {
  aggregation?: InputMaybe<Demo_Rpg_DataOrderFieldAggregation>;
  direction: Demo_Rpg_DataSortOrder;
  field: Demo_Rpg_DataGetMonstersesOrderByField;
  path?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Demo_Rpg_DataOrderFieldType>;
};

export type Demo_Rpg_DataGetNpcsesInput = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Demo_Rpg_DataGetNpcsesOrderByInput>>;
  where?: InputMaybe<Demo_Rpg_DataNpcsesWhereInput>;
};

export enum Demo_Rpg_DataGetNpcsesOrderByField {
  CreatedAt = 'createdAt',
  Data = 'data',
  Id = 'id',
  PublishedAt = 'publishedAt',
  UpdatedAt = 'updatedAt'
}

export type Demo_Rpg_DataGetNpcsesOrderByInput = {
  aggregation?: InputMaybe<Demo_Rpg_DataOrderFieldAggregation>;
  direction: Demo_Rpg_DataSortOrder;
  field: Demo_Rpg_DataGetNpcsesOrderByField;
  path?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Demo_Rpg_DataOrderFieldType>;
};

export type Demo_Rpg_DataGetPartiesesInput = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Demo_Rpg_DataGetPartiesesOrderByInput>>;
  where?: InputMaybe<Demo_Rpg_DataPartiesesWhereInput>;
};

export enum Demo_Rpg_DataGetPartiesesOrderByField {
  CreatedAt = 'createdAt',
  Data = 'data',
  Id = 'id',
  PublishedAt = 'publishedAt',
  UpdatedAt = 'updatedAt'
}

export type Demo_Rpg_DataGetPartiesesOrderByInput = {
  aggregation?: InputMaybe<Demo_Rpg_DataOrderFieldAggregation>;
  direction: Demo_Rpg_DataSortOrder;
  field: Demo_Rpg_DataGetPartiesesOrderByField;
  path?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Demo_Rpg_DataOrderFieldType>;
};

export type Demo_Rpg_DataGetQuestsesInput = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Demo_Rpg_DataGetQuestsesOrderByInput>>;
  where?: InputMaybe<Demo_Rpg_DataQuestsesWhereInput>;
};

export enum Demo_Rpg_DataGetQuestsesOrderByField {
  CreatedAt = 'createdAt',
  Data = 'data',
  Id = 'id',
  PublishedAt = 'publishedAt',
  UpdatedAt = 'updatedAt'
}

export type Demo_Rpg_DataGetQuestsesOrderByInput = {
  aggregation?: InputMaybe<Demo_Rpg_DataOrderFieldAggregation>;
  direction: Demo_Rpg_DataSortOrder;
  field: Demo_Rpg_DataGetQuestsesOrderByField;
  path?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Demo_Rpg_DataOrderFieldType>;
};

export type Demo_Rpg_DataGetRegionsesInput = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Demo_Rpg_DataGetRegionsesOrderByInput>>;
  where?: InputMaybe<Demo_Rpg_DataRegionsesWhereInput>;
};

export enum Demo_Rpg_DataGetRegionsesOrderByField {
  CreatedAt = 'createdAt',
  Data = 'data',
  Id = 'id',
  PublishedAt = 'publishedAt',
  UpdatedAt = 'updatedAt'
}

export type Demo_Rpg_DataGetRegionsesOrderByInput = {
  aggregation?: InputMaybe<Demo_Rpg_DataOrderFieldAggregation>;
  direction: Demo_Rpg_DataSortOrder;
  field: Demo_Rpg_DataGetRegionsesOrderByField;
  path?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Demo_Rpg_DataOrderFieldType>;
};

export type Demo_Rpg_DataGetStatsesInput = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Demo_Rpg_DataGetStatsesOrderByInput>>;
  where?: InputMaybe<Demo_Rpg_DataStatsesWhereInput>;
};

export enum Demo_Rpg_DataGetStatsesOrderByField {
  CreatedAt = 'createdAt',
  Data = 'data',
  Id = 'id',
  PublishedAt = 'publishedAt',
  UpdatedAt = 'updatedAt'
}

export type Demo_Rpg_DataGetStatsesOrderByInput = {
  aggregation?: InputMaybe<Demo_Rpg_DataOrderFieldAggregation>;
  direction: Demo_Rpg_DataSortOrder;
  field: Demo_Rpg_DataGetStatsesOrderByField;
  path?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Demo_Rpg_DataOrderFieldType>;
};

export type Demo_Rpg_DataHeroesesWhereInput = {
  AND?: InputMaybe<Array<Demo_Rpg_DataHeroesesWhereInput>>;
  NOT?: InputMaybe<Array<Demo_Rpg_DataHeroesesWhereInput>>;
  OR?: InputMaybe<Array<Demo_Rpg_DataHeroesesWhereInput>>;
  createdAt?: InputMaybe<Demo_Rpg_DataDateTimeFilter>;
  createdId?: InputMaybe<Demo_Rpg_DataStringFilter>;
  data?: InputMaybe<Demo_Rpg_DataJsonFilter>;
  id?: InputMaybe<Demo_Rpg_DataStringFilter>;
  publishedAt?: InputMaybe<Demo_Rpg_DataDateTimeFilter>;
  readonly?: InputMaybe<Demo_Rpg_DataBoolFilter>;
  updatedAt?: InputMaybe<Demo_Rpg_DataDateTimeFilter>;
  versionId?: InputMaybe<Demo_Rpg_DataStringFilter>;
};

export type Demo_Rpg_DataItem_TypesesWhereInput = {
  AND?: InputMaybe<Array<Demo_Rpg_DataItem_TypesesWhereInput>>;
  NOT?: InputMaybe<Array<Demo_Rpg_DataItem_TypesesWhereInput>>;
  OR?: InputMaybe<Array<Demo_Rpg_DataItem_TypesesWhereInput>>;
  createdAt?: InputMaybe<Demo_Rpg_DataDateTimeFilter>;
  createdId?: InputMaybe<Demo_Rpg_DataStringFilter>;
  data?: InputMaybe<Demo_Rpg_DataJsonFilter>;
  id?: InputMaybe<Demo_Rpg_DataStringFilter>;
  publishedAt?: InputMaybe<Demo_Rpg_DataDateTimeFilter>;
  readonly?: InputMaybe<Demo_Rpg_DataBoolFilter>;
  updatedAt?: InputMaybe<Demo_Rpg_DataDateTimeFilter>;
  versionId?: InputMaybe<Demo_Rpg_DataStringFilter>;
};

export type Demo_Rpg_DataItemsesWhereInput = {
  AND?: InputMaybe<Array<Demo_Rpg_DataItemsesWhereInput>>;
  NOT?: InputMaybe<Array<Demo_Rpg_DataItemsesWhereInput>>;
  OR?: InputMaybe<Array<Demo_Rpg_DataItemsesWhereInput>>;
  createdAt?: InputMaybe<Demo_Rpg_DataDateTimeFilter>;
  createdId?: InputMaybe<Demo_Rpg_DataStringFilter>;
  data?: InputMaybe<Demo_Rpg_DataJsonFilter>;
  id?: InputMaybe<Demo_Rpg_DataStringFilter>;
  publishedAt?: InputMaybe<Demo_Rpg_DataDateTimeFilter>;
  readonly?: InputMaybe<Demo_Rpg_DataBoolFilter>;
  updatedAt?: InputMaybe<Demo_Rpg_DataDateTimeFilter>;
  versionId?: InputMaybe<Demo_Rpg_DataStringFilter>;
};

export type Demo_Rpg_DataJsonFilter = {
  array_contains?: InputMaybe<Array<Scalars['JSON']['input']>>;
  array_ends_with?: InputMaybe<Scalars['JSON']['input']>;
  array_starts_with?: InputMaybe<Scalars['JSON']['input']>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  mode?: InputMaybe<Demo_Rpg_DataFilterJsonMode>;
  path?: InputMaybe<Scalars['JSON']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  searchLanguage?: InputMaybe<Demo_Rpg_DataSearchLanguage>;
  searchType?: InputMaybe<Demo_Rpg_DataSearchType>;
  string_contains?: InputMaybe<Scalars['String']['input']>;
  string_ends_with?: InputMaybe<Scalars['String']['input']>;
  string_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type Demo_Rpg_DataLocationsesWhereInput = {
  AND?: InputMaybe<Array<Demo_Rpg_DataLocationsesWhereInput>>;
  NOT?: InputMaybe<Array<Demo_Rpg_DataLocationsesWhereInput>>;
  OR?: InputMaybe<Array<Demo_Rpg_DataLocationsesWhereInput>>;
  createdAt?: InputMaybe<Demo_Rpg_DataDateTimeFilter>;
  createdId?: InputMaybe<Demo_Rpg_DataStringFilter>;
  data?: InputMaybe<Demo_Rpg_DataJsonFilter>;
  id?: InputMaybe<Demo_Rpg_DataStringFilter>;
  publishedAt?: InputMaybe<Demo_Rpg_DataDateTimeFilter>;
  readonly?: InputMaybe<Demo_Rpg_DataBoolFilter>;
  updatedAt?: InputMaybe<Demo_Rpg_DataDateTimeFilter>;
  versionId?: InputMaybe<Demo_Rpg_DataStringFilter>;
};

export type Demo_Rpg_DataMonstersesWhereInput = {
  AND?: InputMaybe<Array<Demo_Rpg_DataMonstersesWhereInput>>;
  NOT?: InputMaybe<Array<Demo_Rpg_DataMonstersesWhereInput>>;
  OR?: InputMaybe<Array<Demo_Rpg_DataMonstersesWhereInput>>;
  createdAt?: InputMaybe<Demo_Rpg_DataDateTimeFilter>;
  createdId?: InputMaybe<Demo_Rpg_DataStringFilter>;
  data?: InputMaybe<Demo_Rpg_DataJsonFilter>;
  id?: InputMaybe<Demo_Rpg_DataStringFilter>;
  publishedAt?: InputMaybe<Demo_Rpg_DataDateTimeFilter>;
  readonly?: InputMaybe<Demo_Rpg_DataBoolFilter>;
  updatedAt?: InputMaybe<Demo_Rpg_DataDateTimeFilter>;
  versionId?: InputMaybe<Demo_Rpg_DataStringFilter>;
};

export type Demo_Rpg_DataNpcsesWhereInput = {
  AND?: InputMaybe<Array<Demo_Rpg_DataNpcsesWhereInput>>;
  NOT?: InputMaybe<Array<Demo_Rpg_DataNpcsesWhereInput>>;
  OR?: InputMaybe<Array<Demo_Rpg_DataNpcsesWhereInput>>;
  createdAt?: InputMaybe<Demo_Rpg_DataDateTimeFilter>;
  createdId?: InputMaybe<Demo_Rpg_DataStringFilter>;
  data?: InputMaybe<Demo_Rpg_DataJsonFilter>;
  id?: InputMaybe<Demo_Rpg_DataStringFilter>;
  publishedAt?: InputMaybe<Demo_Rpg_DataDateTimeFilter>;
  readonly?: InputMaybe<Demo_Rpg_DataBoolFilter>;
  updatedAt?: InputMaybe<Demo_Rpg_DataDateTimeFilter>;
  versionId?: InputMaybe<Demo_Rpg_DataStringFilter>;
};

export enum Demo_Rpg_DataOrderFieldAggregation {
  Avg = 'avg',
  First = 'first',
  Last = 'last',
  Max = 'max',
  Min = 'min'
}

export enum Demo_Rpg_DataOrderFieldType {
  Boolean = 'boolean',
  Float = 'float',
  Int = 'int',
  Text = 'text',
  Timestamp = 'timestamp'
}

export type Demo_Rpg_DataPartiesesWhereInput = {
  AND?: InputMaybe<Array<Demo_Rpg_DataPartiesesWhereInput>>;
  NOT?: InputMaybe<Array<Demo_Rpg_DataPartiesesWhereInput>>;
  OR?: InputMaybe<Array<Demo_Rpg_DataPartiesesWhereInput>>;
  createdAt?: InputMaybe<Demo_Rpg_DataDateTimeFilter>;
  createdId?: InputMaybe<Demo_Rpg_DataStringFilter>;
  data?: InputMaybe<Demo_Rpg_DataJsonFilter>;
  id?: InputMaybe<Demo_Rpg_DataStringFilter>;
  publishedAt?: InputMaybe<Demo_Rpg_DataDateTimeFilter>;
  readonly?: InputMaybe<Demo_Rpg_DataBoolFilter>;
  updatedAt?: InputMaybe<Demo_Rpg_DataDateTimeFilter>;
  versionId?: InputMaybe<Demo_Rpg_DataStringFilter>;
};

export type Demo_Rpg_DataQuestsesWhereInput = {
  AND?: InputMaybe<Array<Demo_Rpg_DataQuestsesWhereInput>>;
  NOT?: InputMaybe<Array<Demo_Rpg_DataQuestsesWhereInput>>;
  OR?: InputMaybe<Array<Demo_Rpg_DataQuestsesWhereInput>>;
  createdAt?: InputMaybe<Demo_Rpg_DataDateTimeFilter>;
  createdId?: InputMaybe<Demo_Rpg_DataStringFilter>;
  data?: InputMaybe<Demo_Rpg_DataJsonFilter>;
  id?: InputMaybe<Demo_Rpg_DataStringFilter>;
  publishedAt?: InputMaybe<Demo_Rpg_DataDateTimeFilter>;
  readonly?: InputMaybe<Demo_Rpg_DataBoolFilter>;
  updatedAt?: InputMaybe<Demo_Rpg_DataDateTimeFilter>;
  versionId?: InputMaybe<Demo_Rpg_DataStringFilter>;
};

export type Demo_Rpg_DataRegionsesWhereInput = {
  AND?: InputMaybe<Array<Demo_Rpg_DataRegionsesWhereInput>>;
  NOT?: InputMaybe<Array<Demo_Rpg_DataRegionsesWhereInput>>;
  OR?: InputMaybe<Array<Demo_Rpg_DataRegionsesWhereInput>>;
  createdAt?: InputMaybe<Demo_Rpg_DataDateTimeFilter>;
  createdId?: InputMaybe<Demo_Rpg_DataStringFilter>;
  data?: InputMaybe<Demo_Rpg_DataJsonFilter>;
  id?: InputMaybe<Demo_Rpg_DataStringFilter>;
  publishedAt?: InputMaybe<Demo_Rpg_DataDateTimeFilter>;
  readonly?: InputMaybe<Demo_Rpg_DataBoolFilter>;
  updatedAt?: InputMaybe<Demo_Rpg_DataDateTimeFilter>;
  versionId?: InputMaybe<Demo_Rpg_DataStringFilter>;
};

export enum Demo_Rpg_DataSearchLanguage {
  Arabic = 'arabic',
  Armenian = 'armenian',
  Basque = 'basque',
  Catalan = 'catalan',
  Danish = 'danish',
  Dutch = 'dutch',
  English = 'english',
  Finnish = 'finnish',
  French = 'french',
  German = 'german',
  Greek = 'greek',
  Hindi = 'hindi',
  Hungarian = 'hungarian',
  Indonesian = 'indonesian',
  Irish = 'irish',
  Italian = 'italian',
  Lithuanian = 'lithuanian',
  Nepali = 'nepali',
  Norwegian = 'norwegian',
  Portuguese = 'portuguese',
  Romanian = 'romanian',
  Russian = 'russian',
  Serbian = 'serbian',
  Simple = 'simple',
  Spanish = 'spanish',
  Swedish = 'swedish',
  Tamil = 'tamil',
  Turkish = 'turkish',
  Yiddish = 'yiddish'
}

export enum Demo_Rpg_DataSearchType {
  Phrase = 'phrase',
  Plain = 'plain',
  Prefix = 'prefix',
  Tsquery = 'tsquery'
}

export enum Demo_Rpg_DataSortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type Demo_Rpg_DataStatsesWhereInput = {
  AND?: InputMaybe<Array<Demo_Rpg_DataStatsesWhereInput>>;
  NOT?: InputMaybe<Array<Demo_Rpg_DataStatsesWhereInput>>;
  OR?: InputMaybe<Array<Demo_Rpg_DataStatsesWhereInput>>;
  createdAt?: InputMaybe<Demo_Rpg_DataDateTimeFilter>;
  createdId?: InputMaybe<Demo_Rpg_DataStringFilter>;
  data?: InputMaybe<Demo_Rpg_DataJsonFilter>;
  id?: InputMaybe<Demo_Rpg_DataStringFilter>;
  publishedAt?: InputMaybe<Demo_Rpg_DataDateTimeFilter>;
  readonly?: InputMaybe<Demo_Rpg_DataBoolFilter>;
  updatedAt?: InputMaybe<Demo_Rpg_DataDateTimeFilter>;
  versionId?: InputMaybe<Demo_Rpg_DataStringFilter>;
};

export type Demo_Rpg_DataStringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  mode?: InputMaybe<Demo_Rpg_DataFilterStringMode>;
  not?: InputMaybe<Scalars['String']['input']>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SignUpInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type AbilitiesQueryVariables = Exact<{
  data?: InputMaybe<Demo_Rpg_DataGetAbilitiesesInput>;
}>;


export type AbilitiesQuery = { abilitieses: { totalCount: number, edges: Array<{ cursor: string, node: { id: string, versionId: string, createdAt: number | string, publishedAt: number | string, data: { base_damage: number, cooldown: number, kind: string, level_required: number, school: string, description: { en: string, ru: string, zh: string }, icon: { fileId: string, fileName: string, hash: string, height: number, mimeType: string, url: string, width: number }, name: { en: string, ru: string, zh: string } } } }>, pageInfo: { endCursor?: string | null, hasNextPage: boolean } } };

export type ClassesQueryVariables = Exact<{
  data?: InputMaybe<Demo_Rpg_DataGetClassesesInput>;
}>;


export type ClassesQuery = { classeses: { totalCount: number, edges: Array<{ cursor: string, node: { id: string, versionId: string, createdAt: number | string, publishedAt: number | string, data: { base_hp: number, hp_per_level: number, mp_per_level: number, primary_stat: string, icon: { fileId: string, fileName: string, hash: string, height: number, mimeType: string, url: string, width: number }, name: { en: string, ru: string, zh: string }, description: { en: string, ru: string, zh: string } } } }>, pageInfo: { endCursor?: string | null, hasNextPage: boolean } } };

export type DialogsQueryVariables = Exact<{
  data?: InputMaybe<Demo_Rpg_DataGetDialogsesInput>;
}>;


export type DialogsQuery = { dialogses: { totalCount: number, edges: Array<{ cursor: string, node: { id: string, versionId: string, createdAt: number | string, publishedAt: number | string, data: { line_count: number, slug: string, lines: Array<{ emotion: string, speaker: string, text: { en: string, ru: string, zh: string } }>, npc_id: { id: string, data: { display_label_en: string, role: string, name: { en: string, ru: string, zh: string }, title: { en: string, ru: string, zh: string } } } } } }>, pageInfo: { endCursor?: string | null, hasNextPage: boolean } } };

export type EffectsQueryVariables = Exact<{
  data?: InputMaybe<Demo_Rpg_DataGetEffectsesInput>;
}>;


export type EffectsQuery = { effectses: { totalCount: number, edges: Array<{ cursor: string, node: { id: string, versionId: string, createdAt: number | string, publishedAt: number | string, data: { code: string, default_duration: number, kind: string, description: { en: string, ru: string, zh: string }, name: { en: string, ru: string, zh: string } } } }>, pageInfo: { endCursor?: string | null, hasNextPage: boolean } } };

export type FactionDetailQueryVariables = Exact<{
  id: Scalars['String']['input'];
  monstersData?: InputMaybe<Demo_Rpg_DataGetMonstersesInput>;
  npcsData?: InputMaybe<Demo_Rpg_DataGetNpcsesInput>;
}>;


export type FactionDetailQuery = { factions: { id: string, versionId: string, createdAt: number | string, publishedAt: number | string, data: { alignment: string, crest: { extension: string, fileId: string, fileName: string, hash: string, height: number, mimeType: string, size: number, status: string, url: string, width: number }, name: { en: string, ru: string, zh: string }, description: { en: string, ru: string, zh: string } } }, monsterses: { totalCount: number, edges: Array<{ node: { id: string, data: { hp: number, kind: string, level: number, faction_id: { id: string }, name: { en: string, ru: string, zh: string } } } }>, pageInfo: { endCursor?: string | null, hasNextPage: boolean } }, npcses: { totalCount: number, edges: Array<{ node: { id: string, data: { role: string, faction_id: { id: string }, location_id: { id: string, data: { name: { en: string, ru: string, zh: string } } }, name: { en: string, ru: string, zh: string }, title: { en: string, ru: string, zh: string } } } }>, pageInfo: { endCursor?: string | null, hasNextPage: boolean } } };

export type FactionsQueryVariables = Exact<{
  data?: InputMaybe<Demo_Rpg_DataGetFactionsesInput>;
}>;


export type FactionsQuery = { factionses: { totalCount: number, edges: Array<{ cursor: string, node: { id: string, versionId: string, createdAt: number | string, publishedAt: number | string, data: { alignment: string, crest: { extension: string, fileId: string, fileName: string, hash: string, height: number, mimeType: string, size: number, status: string, url: string, width: number }, name: { en: string, ru: string, zh: string }, description: { en: string, ru: string, zh: string } } } }>, pageInfo: { endCursor?: string | null, hasNextPage: boolean } } };

export type BlogPostsQueryVariables = Exact<{
  data?: InputMaybe<Demo_Rpg_CmsGetBlog_PostsesInput>;
}>;


export type BlogPostsQuery = { blog_postses: { totalCount: number, edges: Array<{ cursor: string, node: { id: string, versionId: string, createdAt: number | string, publishedAt: number | string, data: { published_at: string, slug: string, author_id: { id: string, data: { slug: string, avatar: { extension: string, fileId: string, fileName: string, hash: string, height: number, mimeType: string, size: number, status: string, url: string, width: number }, bio: { en: string, ru: string, zh: string }, name: { en: string, ru: string, zh: string } } }, body: { en: string, ru: string, zh: string }, excerpt: { en: string, ru: string, zh: string }, hero_image: { extension: string, fileId: string, fileName: string, hash: string, height: number, mimeType: string, size: number, status: string, url: string, width: number }, title: { en: string, ru: string, zh: string } } } }>, pageInfo: { endCursor?: string | null, hasNextPage: boolean } } };

export type BlogPostBySlugQueryVariables = Exact<{
  data?: InputMaybe<Demo_Rpg_CmsGetBlog_PostsesInput>;
}>;


export type BlogPostBySlugQuery = { blog_postses: { totalCount: number, edges: Array<{ node: { id: string, versionId: string, createdAt: number | string, publishedAt: number | string, data: { published_at: string, slug: string, author_id: { id: string, data: { slug: string, avatar: { extension: string, fileId: string, fileName: string, hash: string, height: number, mimeType: string, size: number, status: string, url: string, width: number }, bio: { en: string, ru: string, zh: string }, name: { en: string, ru: string, zh: string } } }, body: { en: string, ru: string, zh: string }, excerpt: { en: string, ru: string, zh: string }, hero_image: { extension: string, fileId: string, fileName: string, hash: string, height: number, mimeType: string, size: number, status: string, url: string, width: number }, title: { en: string, ru: string, zh: string } } } }>, pageInfo: { endCursor?: string | null, hasNextPage: boolean } } };

export type HeroDetailQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type HeroDetailQuery = { heroes: { id: string, versionId: string, createdAt: number | string, publishedAt: number | string, data: { constitution: number, display_name_en: string, equipped_count: number, gold: number, is_veteran: boolean, level: number, total_equipment_modifier: number, ability_ids: Array<{ id: string, data: { base_damage: number, cooldown: number, damage_scaling: number, kind: string, level_required: number, school: string, name: { en: string, ru: string, zh: string } } }>, class_id: { id: string, data: { base_hp: number, hp_per_level: number, mp_per_level: number, primary_stat: string, name: { en: string, ru: string, zh: string } } }, equipment: Array<{ modifier: number, slot: string, item_id: { id: string, data: { market_value: number, rarity: string, rarity_tag: string, weight: number, name: { en: string, ru: string, zh: string } } } }>, epithet: { en: string, ru: string, zh: string }, inventory_item_ids: Array<{ id: string, data: { market_value: number, rarity: string, rarity_tag: string, weight: number, name: { en: string, ru: string, zh: string }, type_id: { id: string, data: { name: { en: string, ru: string, zh: string } } } } }>, name: { en: string, ru: string, zh: string }, portrait: { extension: string, fileId: string, fileName: string, hash: string, height: number, mimeType: string, size: number, status: string, url: string, width: number } } } };

export type HeroesQueryVariables = Exact<{
  data?: InputMaybe<Demo_Rpg_DataGetHeroesesInput>;
  classesData?: InputMaybe<Demo_Rpg_DataGetClassesesInput>;
}>;


export type HeroesQuery = { heroeses: { totalCount: number, edges: Array<{ cursor: string, node: { id: string, versionId: string, createdAt: number | string, publishedAt: number | string, data: { display_name_en: string, is_veteran: boolean, level: number, epithet: { en: string, ru: string, zh: string }, name: { en: string, ru: string, zh: string }, class_id: { id: string, data: { primary_stat: string, name: { en: string, ru: string, zh: string } } }, portrait: { extension: string, fileId: string, fileName: string, hash: string, height: number, mimeType: string, size: number, status: string, url: string, width: number } } } }>, pageInfo: { endCursor?: string | null, hasNextPage: boolean } }, classeses: { totalCount: number, edges: Array<{ node: { id: string, data: { primary_stat: string, name: { en: string, ru: string, zh: string } } } }>, pageInfo: { endCursor?: string | null, hasNextPage: boolean } } };

export type ItemTypesQueryVariables = Exact<{
  data?: InputMaybe<Demo_Rpg_DataGetItem_TypesesInput>;
}>;


export type ItemTypesQuery = { item_typeses: { totalCount: number, edges: Array<{ cursor: string, node: { id: string, versionId: string, createdAt: number | string, publishedAt: number | string, data: { code: string, description: { en: string, ru: string, zh: string }, name: { en: string, ru: string, zh: string } } } }>, pageInfo: { endCursor?: string | null, hasNextPage: boolean } } };

export type ItemDetailQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type ItemDetailQuery = { items: { id: string, versionId: string, createdAt: number | string, publishedAt: number | string, data: { base_value: number, market_value: number, rarity: string, rarity_multiplier: number, rarity_tag: string, weight: number, description: { en: string, ru: string, zh: string }, icon: { extension: string, fileId: string, fileName: string, hash: string, height: number, mimeType: string, size: number, status: string, url: string, width: number }, modifiers: Array<{ value: number, stat_id: { id: string, data: { abbreviation: string, code: string, description: { en: string, ru: string, zh: string }, name: { en: string, ru: string, zh: string } } } }>, name: { en: string, ru: string, zh: string }, type_id: { id: string, data: { code: string, description: { en: string, ru: string, zh: string }, name: { en: string, ru: string, zh: string } } } } } };

export type ItemsQueryVariables = Exact<{
  data?: InputMaybe<Demo_Rpg_DataGetItemsesInput>;
  typesData?: InputMaybe<Demo_Rpg_DataGetItem_TypesesInput>;
}>;


export type ItemsQuery = { itemses: { totalCount: number, edges: Array<{ cursor: string, node: { id: string, versionId: string, createdAt: number | string, publishedAt: number | string, data: { base_value: number, market_value: number, rarity: string, rarity_tag: string, weight: number, description: { en: string, ru: string, zh: string }, icon: { extension: string, fileId: string, fileName: string, hash: string, height: number, mimeType: string, size: number, status: string, url: string, width: number }, modifiers: Array<{ value: number, stat_id: { id: string, data: { abbreviation: string, code: string, name: { en: string, ru: string, zh: string } } } }>, name: { en: string, ru: string, zh: string }, type_id: { id: string, data: { code: string, name: { en: string, ru: string, zh: string } } } } } }>, pageInfo: { endCursor?: string | null, hasNextPage: boolean } }, item_typeses: { totalCount: number, edges: Array<{ node: { id: string, data: { code: string, description: { en: string, ru: string, zh: string }, name: { en: string, ru: string, zh: string } } } }>, pageInfo: { endCursor?: string | null, hasNextPage: boolean } } };

export type ItemsPageQueryVariables = Exact<{
  data?: InputMaybe<Demo_Rpg_DataGetItemsesInput>;
}>;


export type ItemsPageQuery = { itemses: { totalCount: number, edges: Array<{ cursor: string, node: { id: string, versionId: string, createdAt: number | string, publishedAt: number | string, data: { base_value: number, market_value: number, rarity: string, rarity_tag: string, weight: number, description: { en: string, ru: string, zh: string }, icon: { extension: string, fileId: string, fileName: string, hash: string, height: number, mimeType: string, size: number, status: string, url: string, width: number }, modifiers: Array<{ value: number, stat_id: { id: string, data: { abbreviation: string, code: string, name: { en: string, ru: string, zh: string } } } }>, name: { en: string, ru: string, zh: string }, type_id: { id: string, data: { code: string, name: { en: string, ru: string, zh: string } } } } } }>, pageInfo: { endCursor?: string | null, hasNextPage: boolean } } };

export type ItemCatalogNodeFieldsFragment = { id: string, versionId: string, createdAt: number | string, publishedAt: number | string, data: { base_value: number, market_value: number, rarity: string, rarity_tag: string, weight: number, description: { en: string, ru: string, zh: string }, icon: { extension: string, fileId: string, fileName: string, hash: string, height: number, mimeType: string, size: number, status: string, url: string, width: number }, modifiers: Array<{ value: number, stat_id: { id: string, data: { abbreviation: string, code: string, name: { en: string, ru: string, zh: string } } } }>, name: { en: string, ru: string, zh: string }, type_id: { id: string, data: { code: string, name: { en: string, ru: string, zh: string } } } } };

export type LocationDetailQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type LocationDetailQuery = { locations: { id: string, versionId: string, createdAt: number | string, publishedAt: number | string, data: { kind: string, coordinates: { x: number, y: number }, description: { en: string, ru: string, zh: string }, gallery: Array<{ fileId: string, fileName: string, hash: string, height: number, mimeType: string, url: string, width: number }>, map: { fileId: string, fileName: string, hash: string, height: number, mimeType: string, url: string, width: number }, name: { en: string, ru: string, zh: string }, region_id: { id: string, data: { climate: string, name: { en: string, ru: string, zh: string } } } } } };

export type LocationsQueryVariables = Exact<{
  data?: InputMaybe<Demo_Rpg_DataGetLocationsesInput>;
}>;


export type LocationsQuery = { locationses: { totalCount: number, edges: Array<{ cursor: string, node: { id: string, versionId: string, createdAt: number | string, publishedAt: number | string, data: { kind: string, coordinates: { x: number, y: number }, description: { en: string, ru: string, zh: string }, gallery: Array<{ fileId: string, fileName: string, hash: string, height: number, mimeType: string, url: string, width: number }>, map: { fileId: string, fileName: string, hash: string, height: number, mimeType: string, url: string, width: number }, name: { en: string, ru: string, zh: string }, region_id: { id: string, data: { climate: string, name: { en: string, ru: string, zh: string } } } } } }>, pageInfo: { endCursor?: string | null, hasNextPage: boolean } } };

export type LocationRegionOptionsQueryVariables = Exact<{
  data?: InputMaybe<Demo_Rpg_DataGetRegionsesInput>;
}>;


export type LocationRegionOptionsQuery = { regionses: { edges: Array<{ node: { id: string, data: { climate: string, name: { en: string, ru: string, zh: string } } } }>, pageInfo: { endCursor?: string | null, hasNextPage: boolean } } };

export type MonsterDetailQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type MonsterDetailQuery = { monsters: { id: string, versionId: string, createdAt: number | string, publishedAt: number | string, data: { avg_drop_chance: number, base_damage: number, drop_count: number, hp: number, kind: string, level: number, ability_ids: Array<{ id: string, data: { base_damage: number, cooldown: number, kind: string, level_required: number, school: string, description: { en: string, ru: string, zh: string }, name: { en: string, ru: string, zh: string } } }>, description: { en: string, ru: string, zh: string }, drops: Array<{ chance: number, quantity_max: number, quantity_min: number, item_id: { id: string, data: { market_value: number, rarity: string, rarity_tag: string, name: { en: string, ru: string, zh: string }, type_id: { id: string, data: { name: { en: string, ru: string, zh: string } } } } } }>, faction_id: { id: string, data: { alignment: string, description: { en: string, ru: string, zh: string }, name: { en: string, ru: string, zh: string } } }, image: { extension: string, fileId: string, fileName: string, hash: string, height: number, mimeType: string, size: number, status: string, url: string, width: number }, name: { en: string, ru: string, zh: string } } } };

export type MonstersQueryVariables = Exact<{
  data?: InputMaybe<Demo_Rpg_DataGetMonstersesInput>;
}>;


export type MonstersQuery = { monsterses: { totalCount: number, edges: Array<{ cursor: string, node: { id: string, versionId: string, createdAt: number | string, publishedAt: number | string, data: { avg_drop_chance: number, base_damage: number, drop_count: number, hp: number, kind: string, level: number, description: { en: string, ru: string, zh: string }, drops: Array<{ chance: number, quantity_max: number, quantity_min: number, item_id: { id: string } }>, faction_id: { id: string, data: { alignment: string, name: { en: string, ru: string, zh: string } } }, image: { extension: string, fileId: string, fileName: string, hash: string, height: number, mimeType: string, size: number, status: string, url: string, width: number }, name: { en: string, ru: string, zh: string } } } }>, pageInfo: { endCursor?: string | null, hasNextPage: boolean } } };

export type MonsterFactionOptionsQueryVariables = Exact<{
  data?: InputMaybe<Demo_Rpg_DataGetFactionsesInput>;
}>;


export type MonsterFactionOptionsQuery = { factionses: { edges: Array<{ node: { id: string, data: { alignment: string, name: { en: string, ru: string, zh: string } } } }>, pageInfo: { endCursor?: string | null, hasNextPage: boolean } } };

export type NpcDetailQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type NpcDetailQuery = { npcs: { id: string, versionId: string, createdAt: number | string, publishedAt: number | string, data: { display_label_en: string, role: string, description: { en: string, ru: string, zh: string }, location_id: { id: string, data: { kind: string, name: { en: string, ru: string, zh: string } } }, name: { en: string, ru: string, zh: string }, portrait: { fileId: string, fileName: string, hash: string, height: number, mimeType: string, url: string, width: number }, title: { en: string, ru: string, zh: string } } } };

export type NpcsQueryVariables = Exact<{
  data?: InputMaybe<Demo_Rpg_DataGetNpcsesInput>;
}>;


export type NpcsQuery = { npcses: { totalCount: number, edges: Array<{ cursor: string, node: { id: string, versionId: string, createdAt: number | string, publishedAt: number | string, data: { display_label_en: string, role: string, description: { en: string, ru: string, zh: string }, location_id: { id: string, data: { name: { en: string, ru: string, zh: string } } }, name: { en: string, ru: string, zh: string }, portrait: { fileId: string, fileName: string, hash: string, height: number, mimeType: string, url: string, width: number }, title: { en: string, ru: string, zh: string } } } }>, pageInfo: { endCursor?: string | null, hasNextPage: boolean } } };

export type NpcLocationOptionsQueryVariables = Exact<{
  data?: InputMaybe<Demo_Rpg_DataGetLocationsesInput>;
}>;


export type NpcLocationOptionsQuery = { locationses: { edges: Array<{ node: { id: string, data: { name: { en: string, ru: string, zh: string } } } }>, pageInfo: { endCursor?: string | null, hasNextPage: boolean } } };

export type PartiesQueryVariables = Exact<{
  data?: InputMaybe<Demo_Rpg_DataGetPartiesesInput>;
}>;


export type PartiesQuery = { partieses: { totalCount: number, edges: Array<{ cursor: string, node: { id: string, versionId: string, createdAt: number | string, publishedAt: number | string, data: { formation: string, is_full: boolean, member_count: number, hero_ids: Array<{ id: string, data: { display_name_en: string, epithet: { en: string, ru: string, zh: string }, name: { en: string, ru: string, zh: string }, portrait: { fileId: string, fileName: string, hash: string, height: number, mimeType: string, url: string, width: number } } }>, motto: { en: string, ru: string, zh: string }, name: { en: string, ru: string, zh: string } } } }>, pageInfo: { endCursor?: string | null, hasNextPage: boolean } } };

export type PartyDetailQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type PartyDetailQuery = { parties: { id: string, versionId: string, createdAt: number | string, publishedAt: number | string, data: { formation: string, is_full: boolean, member_count: number, hero_ids: Array<{ id: string, data: { display_name_en: string, is_veteran: boolean, level: number, class_id: { id: string, data: { primary_stat: string, name: { en: string, ru: string, zh: string } } }, epithet: { en: string, ru: string, zh: string }, name: { en: string, ru: string, zh: string }, portrait: { fileId: string, fileName: string, hash: string, height: number, mimeType: string, url: string, width: number } } }>, motto: { en: string, ru: string, zh: string }, name: { en: string, ru: string, zh: string } } } };

export type QuestDetailQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type QuestDetailQuery = { quests: { id: string, versionId: string, createdAt: number | string, publishedAt: number | string, data: { is_repeatable: boolean, kind: string, level_required: number, step_count: number, total_loot_xp: number, total_xp: number, description: { en: string, ru: string, zh: string }, giver_npc_id: { id: string, data: { display_label_en: string, role: string, name: { en: string, ru: string, zh: string }, title: { en: string, ru: string, zh: string } } }, map: { extension: string, fileId: string, fileName: string, hash: string, height: number, mimeType: string, size: number, status: string, url: string, width: number }, name: { en: string, ru: string, zh: string }, steps: Array<{ step_number: number, xp: number, description: { en: string, ru: string, zh: string }, image: { extension: string, fileId: string, fileName: string, hash: string, height: number, mimeType: string, size: number, status: string, url: string, width: number }, location_id: { id: string, data: { kind: string, name: { en: string, ru: string, zh: string } } }, npc_id: { id: string, data: { display_label_en: string, role: string, name: { en: string, ru: string, zh: string }, title: { en: string, ru: string, zh: string } } }, rewards: Array<{ bonus_xp: number, quantity: number, item_id: { id: string, data: { base_value: number, market_value: number, rarity: string, rarity_tag: string, name: { en: string, ru: string, zh: string }, type_id: { id: string, data: { code: string, name: { en: string, ru: string, zh: string } } } } } }> }> } } };

export type QuestsQueryVariables = Exact<{
  data?: InputMaybe<Demo_Rpg_DataGetQuestsesInput>;
}>;


export type QuestsQuery = { questses: { totalCount: number, edges: Array<{ cursor: string, node: { id: string, versionId: string, createdAt: number | string, publishedAt: number | string, data: { is_repeatable: boolean, kind: string, level_required: number, step_count: number, total_loot_xp: number, total_xp: number, description: { en: string, ru: string, zh: string }, giver_npc_id: { id: string, data: { display_label_en: string, name: { en: string, ru: string, zh: string }, title: { en: string, ru: string, zh: string } } }, name: { en: string, ru: string, zh: string }, steps: Array<{ step_number: number, xp: number, location_id: { id: string, data: { kind: string, name: { en: string, ru: string, zh: string } } }, npc_id: { id: string, data: { display_label_en: string, name: { en: string, ru: string, zh: string }, title: { en: string, ru: string, zh: string } } } }> } } }>, pageInfo: { endCursor?: string | null, hasNextPage: boolean } } };

export type QuestLocationOptionsQueryVariables = Exact<{
  data?: InputMaybe<Demo_Rpg_DataGetLocationsesInput>;
}>;


export type QuestLocationOptionsQuery = { locationses: { edges: Array<{ node: { id: string, data: { kind: string, name: { en: string, ru: string, zh: string } } } }>, pageInfo: { endCursor?: string | null, hasNextPage: boolean } } };

export type QuestNpcOptionsQueryVariables = Exact<{
  data?: InputMaybe<Demo_Rpg_DataGetNpcsesInput>;
}>;


export type QuestNpcOptionsQuery = { npcses: { edges: Array<{ node: { id: string, data: { display_label_en: string, name: { en: string, ru: string, zh: string }, title: { en: string, ru: string, zh: string } } } }>, pageInfo: { endCursor?: string | null, hasNextPage: boolean } } };

export type RegionDetailQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type RegionDetailQuery = { regions: { id: string, versionId: string, createdAt: number | string, publishedAt: number | string, data: { climate: string, cover_image: { fileId: string, fileName: string, hash: string, height: number, mimeType: string, url: string, width: number }, name: { en: string, ru: string, zh: string }, description: { en: string, ru: string, zh: string } } } };

export type RegionsQueryVariables = Exact<{
  data?: InputMaybe<Demo_Rpg_DataGetRegionsesInput>;
}>;


export type RegionsQuery = { regionses: { totalCount: number, edges: Array<{ cursor: string, node: { id: string, versionId: string, createdAt: number | string, publishedAt: number | string, data: { climate: string, cover_image: { fileId: string, fileName: string, hash: string, height: number, mimeType: string, url: string, width: number }, name: { en: string, ru: string, zh: string }, description: { en: string, ru: string, zh: string } } } }>, pageInfo: { endCursor?: string | null, hasNextPage: boolean } } };

export type SearchPageQueryVariables = Exact<{
  first: Scalars['Int']['input'];
}>;


export type SearchPageQuery = { abilities: { totalCount: number, edges: Array<{ node: { id: string, json: unknown, publishedAt: number | string, updatedAt: number | string } }> }, blogAuthors: { totalCount: number, edges: Array<{ node: { id: string, json: unknown, publishedAt: number | string, updatedAt: number | string } }> }, blogPosts: { totalCount: number, edges: Array<{ node: { id: string, json: unknown, publishedAt: number | string, updatedAt: number | string } }> }, classes: { totalCount: number, edges: Array<{ node: { id: string, json: unknown, publishedAt: number | string, updatedAt: number | string } }> }, dialogs: { totalCount: number, edges: Array<{ node: { id: string, json: unknown, publishedAt: number | string, updatedAt: number | string } }> }, effects: { totalCount: number, edges: Array<{ node: { id: string, json: unknown, publishedAt: number | string, updatedAt: number | string } }> }, factions: { totalCount: number, edges: Array<{ node: { id: string, json: unknown, publishedAt: number | string, updatedAt: number | string } }> }, heroes: { totalCount: number, edges: Array<{ node: { id: string, json: unknown, publishedAt: number | string, updatedAt: number | string } }> }, itemTypes: { totalCount: number, edges: Array<{ node: { id: string, json: unknown, publishedAt: number | string, updatedAt: number | string } }> }, items: { totalCount: number, edges: Array<{ node: { id: string, json: unknown, publishedAt: number | string, updatedAt: number | string } }> }, landingFeatures: { totalCount: number, edges: Array<{ node: { id: string, json: unknown, publishedAt: number | string, updatedAt: number | string } }> }, landingHero: { totalCount: number, edges: Array<{ node: { id: string, json: unknown, publishedAt: number | string, updatedAt: number | string } }> }, landingTestimonials: { totalCount: number, edges: Array<{ node: { id: string, json: unknown, publishedAt: number | string, updatedAt: number | string } }> }, locations: { totalCount: number, edges: Array<{ node: { id: string, json: unknown, publishedAt: number | string, updatedAt: number | string } }> }, monsters: { totalCount: number, edges: Array<{ node: { id: string, json: unknown, publishedAt: number | string, updatedAt: number | string } }> }, npcs: { totalCount: number, edges: Array<{ node: { id: string, json: unknown, publishedAt: number | string, updatedAt: number | string } }> }, parties: { totalCount: number, edges: Array<{ node: { id: string, json: unknown, publishedAt: number | string, updatedAt: number | string } }> }, quests: { totalCount: number, edges: Array<{ node: { id: string, json: unknown, publishedAt: number | string, updatedAt: number | string } }> }, regions: { totalCount: number, edges: Array<{ node: { id: string, json: unknown, publishedAt: number | string, updatedAt: number | string } }> }, stats: { totalCount: number, edges: Array<{ node: { id: string, json: unknown, publishedAt: number | string, updatedAt: number | string } }> } };

export type StatsQueryVariables = Exact<{
  data?: InputMaybe<Demo_Rpg_DataGetStatsesInput>;
}>;


export type StatsQuery = { statses: { totalCount: number, edges: Array<{ cursor: string, node: { id: string, versionId: string, createdAt: number | string, publishedAt: number | string, data: { abbreviation: string, code: string, description: { en: string, ru: string, zh: string }, name: { en: string, ru: string, zh: string } } } }>, pageInfo: { endCursor?: string | null, hasNextPage: boolean } } };

export const ItemCatalogNodeFieldsFragmentDoc = gql`
    fragment ItemCatalogNodeFields on Demo_rpg_dataItemsNode {
  id
  versionId
  createdAt
  publishedAt
  data {
    base_value
    description {
      en
      ru
      zh
    }
    icon {
      extension
      fileId
      fileName
      hash
      height
      mimeType
      size
      status
      url
      width
    }
    market_value
    modifiers {
      stat_id {
        id
        data {
          abbreviation
          code
          name {
            en
            ru
            zh
          }
        }
      }
      value
    }
    name {
      en
      ru
      zh
    }
    rarity
    rarity_tag
    type_id {
      id
      data {
        code
        name {
          en
          ru
          zh
        }
      }
    }
    weight
  }
}
    `;
export const AbilitiesDocument = gql`
    query Abilities($data: Demo_rpg_dataGetAbilitiesesInput) {
  abilitieses(data: $data) {
    edges {
      cursor
      node {
        id
        versionId
        createdAt
        publishedAt
        data {
          base_damage
          cooldown
          description {
            en
            ru
            zh
          }
          icon {
            fileId
            fileName
            hash
            height
            mimeType
            url
            width
          }
          kind
          level_required
          name {
            en
            ru
            zh
          }
          school
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
    totalCount
  }
}
    `;
export const ClassesDocument = gql`
    query Classes($data: Demo_rpg_dataGetClassesesInput) {
  classeses(data: $data) {
    edges {
      cursor
      node {
        id
        versionId
        createdAt
        publishedAt
        data {
          base_hp
          hp_per_level
          icon {
            fileId
            fileName
            hash
            height
            mimeType
            url
            width
          }
          mp_per_level
          primary_stat
          name {
            en
            ru
            zh
          }
          description {
            en
            ru
            zh
          }
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
    totalCount
  }
}
    `;
export const DialogsDocument = gql`
    query Dialogs($data: Demo_rpg_dataGetDialogsesInput) {
  dialogses(data: $data) {
    edges {
      cursor
      node {
        id
        versionId
        createdAt
        publishedAt
        data {
          line_count
          lines {
            emotion
            speaker
            text {
              en
              ru
              zh
            }
          }
          npc_id {
            id
            data {
              display_label_en
              name {
                en
                ru
                zh
              }
              role
              title {
                en
                ru
                zh
              }
            }
          }
          slug
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
    totalCount
  }
}
    `;
export const EffectsDocument = gql`
    query Effects($data: Demo_rpg_dataGetEffectsesInput) {
  effectses(data: $data) {
    edges {
      cursor
      node {
        id
        versionId
        createdAt
        publishedAt
        data {
          code
          default_duration
          description {
            en
            ru
            zh
          }
          kind
          name {
            en
            ru
            zh
          }
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
    totalCount
  }
}
    `;
export const FactionDetailDocument = gql`
    query FactionDetail($id: String!, $monstersData: Demo_rpg_dataGetMonstersesInput, $npcsData: Demo_rpg_dataGetNpcsesInput) {
  factions(id: $id) {
    id
    versionId
    createdAt
    publishedAt
    data {
      alignment
      crest {
        extension
        fileId
        fileName
        hash
        height
        mimeType
        size
        status
        url
        width
      }
      name {
        en
        ru
        zh
      }
      description {
        en
        ru
        zh
      }
    }
  }
  monsterses(data: $monstersData) {
    edges {
      node {
        id
        data {
          faction_id {
            id
          }
          hp
          kind
          level
          name {
            en
            ru
            zh
          }
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
    totalCount
  }
  npcses(data: $npcsData) {
    edges {
      node {
        id
        data {
          faction_id {
            id
          }
          location_id {
            id
            data {
              name {
                en
                ru
                zh
              }
            }
          }
          name {
            en
            ru
            zh
          }
          role
          title {
            en
            ru
            zh
          }
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
    totalCount
  }
}
    `;
export const FactionsDocument = gql`
    query Factions($data: Demo_rpg_dataGetFactionsesInput) {
  factionses(data: $data) {
    edges {
      cursor
      node {
        id
        versionId
        createdAt
        publishedAt
        data {
          alignment
          crest {
            extension
            fileId
            fileName
            hash
            height
            mimeType
            size
            status
            url
            width
          }
          name {
            en
            ru
            zh
          }
          description {
            en
            ru
            zh
          }
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
    totalCount
  }
}
    `;
export const BlogPostsDocument = gql`
    query BlogPosts($data: Demo_rpg_cmsGetBlog_postsesInput) {
  blog_postses(data: $data) {
    edges {
      cursor
      node {
        id
        versionId
        createdAt
        publishedAt
        data {
          author_id {
            id
            data {
              avatar {
                extension
                fileId
                fileName
                hash
                height
                mimeType
                size
                status
                url
                width
              }
              bio {
                en
                ru
                zh
              }
              name {
                en
                ru
                zh
              }
              slug
            }
          }
          body {
            en
            ru
            zh
          }
          excerpt {
            en
            ru
            zh
          }
          hero_image {
            extension
            fileId
            fileName
            hash
            height
            mimeType
            size
            status
            url
            width
          }
          published_at
          slug
          title {
            en
            ru
            zh
          }
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
    totalCount
  }
}
    `;
export const BlogPostBySlugDocument = gql`
    query BlogPostBySlug($data: Demo_rpg_cmsGetBlog_postsesInput) {
  blog_postses(data: $data) {
    edges {
      node {
        id
        versionId
        createdAt
        publishedAt
        data {
          author_id {
            id
            data {
              avatar {
                extension
                fileId
                fileName
                hash
                height
                mimeType
                size
                status
                url
                width
              }
              bio {
                en
                ru
                zh
              }
              name {
                en
                ru
                zh
              }
              slug
            }
          }
          body {
            en
            ru
            zh
          }
          excerpt {
            en
            ru
            zh
          }
          hero_image {
            extension
            fileId
            fileName
            hash
            height
            mimeType
            size
            status
            url
            width
          }
          published_at
          slug
          title {
            en
            ru
            zh
          }
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
    totalCount
  }
}
    `;
export const HeroDetailDocument = gql`
    query HeroDetail($id: String!) {
  heroes(id: $id) {
    id
    versionId
    createdAt
    publishedAt
    data {
      ability_ids {
        id
        data {
          base_damage
          cooldown
          damage_scaling
          kind
          level_required
          name {
            en
            ru
            zh
          }
          school
        }
      }
      class_id {
        id
        data {
          base_hp
          hp_per_level
          mp_per_level
          name {
            en
            ru
            zh
          }
          primary_stat
        }
      }
      constitution
      display_name_en
      equipment {
        item_id {
          id
          data {
            market_value
            name {
              en
              ru
              zh
            }
            rarity
            rarity_tag
            weight
          }
        }
        modifier
        slot
      }
      equipped_count
      epithet {
        en
        ru
        zh
      }
      gold
      inventory_item_ids {
        id
        data {
          market_value
          name {
            en
            ru
            zh
          }
          rarity
          rarity_tag
          type_id {
            id
            data {
              name {
                en
                ru
                zh
              }
            }
          }
          weight
        }
      }
      is_veteran
      level
      name {
        en
        ru
        zh
      }
      portrait {
        extension
        fileId
        fileName
        hash
        height
        mimeType
        size
        status
        url
        width
      }
      total_equipment_modifier
    }
  }
}
    `;
export const HeroesDocument = gql`
    query Heroes($data: Demo_rpg_dataGetHeroesesInput, $classesData: Demo_rpg_dataGetClassesesInput) {
  heroeses(data: $data) {
    edges {
      cursor
      node {
        id
        versionId
        createdAt
        publishedAt
        data {
          display_name_en
          epithet {
            en
            ru
            zh
          }
          is_veteran
          level
          name {
            en
            ru
            zh
          }
          class_id {
            id
            data {
              name {
                en
                ru
                zh
              }
              primary_stat
            }
          }
          portrait {
            extension
            fileId
            fileName
            hash
            height
            mimeType
            size
            status
            url
            width
          }
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
    totalCount
  }
  classeses(data: $classesData) {
    edges {
      node {
        id
        data {
          name {
            en
            ru
            zh
          }
          primary_stat
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
    totalCount
  }
}
    `;
export const ItemTypesDocument = gql`
    query ItemTypes($data: Demo_rpg_dataGetItem_typesesInput) {
  item_typeses(data: $data) {
    edges {
      cursor
      node {
        id
        versionId
        createdAt
        publishedAt
        data {
          code
          description {
            en
            ru
            zh
          }
          name {
            en
            ru
            zh
          }
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
    totalCount
  }
}
    `;
export const ItemDetailDocument = gql`
    query ItemDetail($id: String!) {
  items(id: $id) {
    id
    versionId
    createdAt
    publishedAt
    data {
      base_value
      description {
        en
        ru
        zh
      }
      icon {
        extension
        fileId
        fileName
        hash
        height
        mimeType
        size
        status
        url
        width
      }
      market_value
      modifiers {
        stat_id {
          id
          data {
            abbreviation
            code
            description {
              en
              ru
              zh
            }
            name {
              en
              ru
              zh
            }
          }
        }
        value
      }
      name {
        en
        ru
        zh
      }
      rarity
      rarity_multiplier
      rarity_tag
      type_id {
        id
        data {
          code
          description {
            en
            ru
            zh
          }
          name {
            en
            ru
            zh
          }
        }
      }
      weight
    }
  }
}
    `;
export const ItemsDocument = gql`
    query Items($data: Demo_rpg_dataGetItemsesInput, $typesData: Demo_rpg_dataGetItem_typesesInput) {
  itemses(data: $data) {
    edges {
      cursor
      node {
        ...ItemCatalogNodeFields
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
    totalCount
  }
  item_typeses(data: $typesData) {
    edges {
      node {
        id
        data {
          code
          description {
            en
            ru
            zh
          }
          name {
            en
            ru
            zh
          }
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
    totalCount
  }
}
    ${ItemCatalogNodeFieldsFragmentDoc}`;
export const ItemsPageDocument = gql`
    query ItemsPage($data: Demo_rpg_dataGetItemsesInput) {
  itemses(data: $data) {
    edges {
      cursor
      node {
        ...ItemCatalogNodeFields
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
    totalCount
  }
}
    ${ItemCatalogNodeFieldsFragmentDoc}`;
export const LocationDetailDocument = gql`
    query LocationDetail($id: String!) {
  locations(id: $id) {
    id
    versionId
    createdAt
    publishedAt
    data {
      coordinates {
        x
        y
      }
      description {
        en
        ru
        zh
      }
      gallery {
        fileId
        fileName
        hash
        height
        mimeType
        url
        width
      }
      kind
      map {
        fileId
        fileName
        hash
        height
        mimeType
        url
        width
      }
      name {
        en
        ru
        zh
      }
      region_id {
        id
        data {
          climate
          name {
            en
            ru
            zh
          }
        }
      }
    }
  }
}
    `;
export const LocationsDocument = gql`
    query Locations($data: Demo_rpg_dataGetLocationsesInput) {
  locationses(data: $data) {
    edges {
      cursor
      node {
        id
        versionId
        createdAt
        publishedAt
        data {
          coordinates {
            x
            y
          }
          description {
            en
            ru
            zh
          }
          gallery {
            fileId
            fileName
            hash
            height
            mimeType
            url
            width
          }
          kind
          map {
            fileId
            fileName
            hash
            height
            mimeType
            url
            width
          }
          name {
            en
            ru
            zh
          }
          region_id {
            id
            data {
              climate
              name {
                en
                ru
                zh
              }
            }
          }
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
    totalCount
  }
}
    `;
export const LocationRegionOptionsDocument = gql`
    query LocationRegionOptions($data: Demo_rpg_dataGetRegionsesInput) {
  regionses(data: $data) {
    edges {
      node {
        id
        data {
          climate
          name {
            en
            ru
            zh
          }
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
    `;
export const MonsterDetailDocument = gql`
    query MonsterDetail($id: String!) {
  monsters(id: $id) {
    id
    versionId
    createdAt
    publishedAt
    data {
      ability_ids {
        id
        data {
          base_damage
          cooldown
          description {
            en
            ru
            zh
          }
          kind
          level_required
          name {
            en
            ru
            zh
          }
          school
        }
      }
      avg_drop_chance
      base_damage
      description {
        en
        ru
        zh
      }
      drop_count
      drops {
        chance
        item_id {
          id
          data {
            market_value
            name {
              en
              ru
              zh
            }
            rarity
            rarity_tag
            type_id {
              id
              data {
                name {
                  en
                  ru
                  zh
                }
              }
            }
          }
        }
        quantity_max
        quantity_min
      }
      faction_id {
        id
        data {
          alignment
          description {
            en
            ru
            zh
          }
          name {
            en
            ru
            zh
          }
        }
      }
      hp
      image {
        extension
        fileId
        fileName
        hash
        height
        mimeType
        size
        status
        url
        width
      }
      kind
      level
      name {
        en
        ru
        zh
      }
    }
  }
}
    `;
export const MonstersDocument = gql`
    query Monsters($data: Demo_rpg_dataGetMonstersesInput) {
  monsterses(data: $data) {
    edges {
      cursor
      node {
        id
        versionId
        createdAt
        publishedAt
        data {
          avg_drop_chance
          base_damage
          description {
            en
            ru
            zh
          }
          drop_count
          drops {
            chance
            item_id {
              id
            }
            quantity_max
            quantity_min
          }
          faction_id {
            id
            data {
              alignment
              name {
                en
                ru
                zh
              }
            }
          }
          hp
          image {
            extension
            fileId
            fileName
            hash
            height
            mimeType
            size
            status
            url
            width
          }
          kind
          level
          name {
            en
            ru
            zh
          }
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
    totalCount
  }
}
    `;
export const MonsterFactionOptionsDocument = gql`
    query MonsterFactionOptions($data: Demo_rpg_dataGetFactionsesInput) {
  factionses(data: $data) {
    edges {
      node {
        id
        data {
          alignment
          name {
            en
            ru
            zh
          }
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
    `;
export const NpcDetailDocument = gql`
    query NpcDetail($id: String!) {
  npcs(id: $id) {
    id
    versionId
    createdAt
    publishedAt
    data {
      description {
        en
        ru
        zh
      }
      display_label_en
      location_id {
        id
        data {
          kind
          name {
            en
            ru
            zh
          }
        }
      }
      name {
        en
        ru
        zh
      }
      portrait {
        fileId
        fileName
        hash
        height
        mimeType
        url
        width
      }
      role
      title {
        en
        ru
        zh
      }
    }
  }
}
    `;
export const NpcsDocument = gql`
    query Npcs($data: Demo_rpg_dataGetNpcsesInput) {
  npcses(data: $data) {
    edges {
      cursor
      node {
        id
        versionId
        createdAt
        publishedAt
        data {
          description {
            en
            ru
            zh
          }
          display_label_en
          location_id {
            id
            data {
              name {
                en
                ru
                zh
              }
            }
          }
          name {
            en
            ru
            zh
          }
          portrait {
            fileId
            fileName
            hash
            height
            mimeType
            url
            width
          }
          role
          title {
            en
            ru
            zh
          }
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
    totalCount
  }
}
    `;
export const NpcLocationOptionsDocument = gql`
    query NpcLocationOptions($data: Demo_rpg_dataGetLocationsesInput) {
  locationses(data: $data) {
    edges {
      node {
        id
        data {
          name {
            en
            ru
            zh
          }
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
    `;
export const PartiesDocument = gql`
    query Parties($data: Demo_rpg_dataGetPartiesesInput) {
  partieses(data: $data) {
    edges {
      cursor
      node {
        id
        versionId
        createdAt
        publishedAt
        data {
          formation
          hero_ids {
            id
            data {
              display_name_en
              epithet {
                en
                ru
                zh
              }
              name {
                en
                ru
                zh
              }
              portrait {
                fileId
                fileName
                hash
                height
                mimeType
                url
                width
              }
            }
          }
          is_full
          member_count
          motto {
            en
            ru
            zh
          }
          name {
            en
            ru
            zh
          }
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
    totalCount
  }
}
    `;
export const PartyDetailDocument = gql`
    query PartyDetail($id: String!) {
  parties(id: $id) {
    id
    versionId
    createdAt
    publishedAt
    data {
      formation
      hero_ids {
        id
        data {
          class_id {
            id
            data {
              name {
                en
                ru
                zh
              }
              primary_stat
            }
          }
          display_name_en
          epithet {
            en
            ru
            zh
          }
          is_veteran
          level
          name {
            en
            ru
            zh
          }
          portrait {
            fileId
            fileName
            hash
            height
            mimeType
            url
            width
          }
        }
      }
      is_full
      member_count
      motto {
        en
        ru
        zh
      }
      name {
        en
        ru
        zh
      }
    }
  }
}
    `;
export const QuestDetailDocument = gql`
    query QuestDetail($id: String!) {
  quests(id: $id) {
    id
    versionId
    createdAt
    publishedAt
    data {
      description {
        en
        ru
        zh
      }
      giver_npc_id {
        id
        data {
          display_label_en
          name {
            en
            ru
            zh
          }
          role
          title {
            en
            ru
            zh
          }
        }
      }
      is_repeatable
      kind
      level_required
      map {
        extension
        fileId
        fileName
        hash
        height
        mimeType
        size
        status
        url
        width
      }
      name {
        en
        ru
        zh
      }
      step_count
      steps {
        description {
          en
          ru
          zh
        }
        image {
          extension
          fileId
          fileName
          hash
          height
          mimeType
          size
          status
          url
          width
        }
        location_id {
          id
          data {
            kind
            name {
              en
              ru
              zh
            }
          }
        }
        npc_id {
          id
          data {
            display_label_en
            name {
              en
              ru
              zh
            }
            role
            title {
              en
              ru
              zh
            }
          }
        }
        rewards {
          bonus_xp
          item_id {
            id
            data {
              base_value
              market_value
              name {
                en
                ru
                zh
              }
              rarity
              rarity_tag
              type_id {
                id
                data {
                  code
                  name {
                    en
                    ru
                    zh
                  }
                }
              }
            }
          }
          quantity
        }
        step_number
        xp
      }
      total_loot_xp
      total_xp
    }
  }
}
    `;
export const QuestsDocument = gql`
    query Quests($data: Demo_rpg_dataGetQuestsesInput) {
  questses(data: $data) {
    edges {
      cursor
      node {
        id
        versionId
        createdAt
        publishedAt
        data {
          description {
            en
            ru
            zh
          }
          giver_npc_id {
            id
            data {
              display_label_en
              name {
                en
                ru
                zh
              }
              title {
                en
                ru
                zh
              }
            }
          }
          is_repeatable
          kind
          level_required
          name {
            en
            ru
            zh
          }
          step_count
          steps {
            location_id {
              id
              data {
                kind
                name {
                  en
                  ru
                  zh
                }
              }
            }
            npc_id {
              id
              data {
                display_label_en
                name {
                  en
                  ru
                  zh
                }
                title {
                  en
                  ru
                  zh
                }
              }
            }
            step_number
            xp
          }
          total_loot_xp
          total_xp
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
    totalCount
  }
}
    `;
export const QuestLocationOptionsDocument = gql`
    query QuestLocationOptions($data: Demo_rpg_dataGetLocationsesInput) {
  locationses(data: $data) {
    edges {
      node {
        id
        data {
          kind
          name {
            en
            ru
            zh
          }
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
    `;
export const QuestNpcOptionsDocument = gql`
    query QuestNpcOptions($data: Demo_rpg_dataGetNpcsesInput) {
  npcses(data: $data) {
    edges {
      node {
        id
        data {
          display_label_en
          name {
            en
            ru
            zh
          }
          title {
            en
            ru
            zh
          }
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
    `;
export const RegionDetailDocument = gql`
    query RegionDetail($id: String!) {
  regions(id: $id) {
    id
    versionId
    createdAt
    publishedAt
    data {
      climate
      cover_image {
        fileId
        fileName
        hash
        height
        mimeType
        url
        width
      }
      name {
        en
        ru
        zh
      }
      description {
        en
        ru
        zh
      }
    }
  }
}
    `;
export const RegionsDocument = gql`
    query Regions($data: Demo_rpg_dataGetRegionsesInput) {
  regionses(data: $data) {
    edges {
      cursor
      node {
        id
        versionId
        createdAt
        publishedAt
        data {
          climate
          cover_image {
            fileId
            fileName
            hash
            height
            mimeType
            url
            width
          }
          name {
            en
            ru
            zh
          }
          description {
            en
            ru
            zh
          }
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
    totalCount
  }
}
    `;
export const SearchPageDocument = gql`
    query SearchPage($first: Int!) {
  abilities: abilitieses(data: {first: $first}) {
    edges {
      node {
        id
        json
        publishedAt
        updatedAt
      }
    }
    totalCount
  }
  blogAuthors: blog_authorses(data: {first: $first}) {
    edges {
      node {
        id
        json
        publishedAt
        updatedAt
      }
    }
    totalCount
  }
  blogPosts: blog_postses(data: {first: $first}) {
    edges {
      node {
        id
        json
        publishedAt
        updatedAt
      }
    }
    totalCount
  }
  classes: classeses(data: {first: $first}) {
    edges {
      node {
        id
        json
        publishedAt
        updatedAt
      }
    }
    totalCount
  }
  dialogs: dialogses(data: {first: $first}) {
    edges {
      node {
        id
        json
        publishedAt
        updatedAt
      }
    }
    totalCount
  }
  effects: effectses(data: {first: $first}) {
    edges {
      node {
        id
        json
        publishedAt
        updatedAt
      }
    }
    totalCount
  }
  factions: factionses(data: {first: $first}) {
    edges {
      node {
        id
        json
        publishedAt
        updatedAt
      }
    }
    totalCount
  }
  heroes: heroeses(data: {first: $first}) {
    edges {
      node {
        id
        json
        publishedAt
        updatedAt
      }
    }
    totalCount
  }
  itemTypes: item_typeses(data: {first: $first}) {
    edges {
      node {
        id
        json
        publishedAt
        updatedAt
      }
    }
    totalCount
  }
  items: itemses(data: {first: $first}) {
    edges {
      node {
        id
        json
        publishedAt
        updatedAt
      }
    }
    totalCount
  }
  landingFeatures: landing_featureses(data: {first: $first}) {
    edges {
      node {
        id
        json
        publishedAt
        updatedAt
      }
    }
    totalCount
  }
  landingHero: landing_heros(data: {first: $first}) {
    edges {
      node {
        id
        json
        publishedAt
        updatedAt
      }
    }
    totalCount
  }
  landingTestimonials: landing_testimonialses(data: {first: $first}) {
    edges {
      node {
        id
        json
        publishedAt
        updatedAt
      }
    }
    totalCount
  }
  locations: locationses(data: {first: $first}) {
    edges {
      node {
        id
        json
        publishedAt
        updatedAt
      }
    }
    totalCount
  }
  monsters: monsterses(data: {first: $first}) {
    edges {
      node {
        id
        json
        publishedAt
        updatedAt
      }
    }
    totalCount
  }
  npcs: npcses(data: {first: $first}) {
    edges {
      node {
        id
        json
        publishedAt
        updatedAt
      }
    }
    totalCount
  }
  parties: partieses(data: {first: $first}) {
    edges {
      node {
        id
        json
        publishedAt
        updatedAt
      }
    }
    totalCount
  }
  quests: questses(data: {first: $first}) {
    edges {
      node {
        id
        json
        publishedAt
        updatedAt
      }
    }
    totalCount
  }
  regions: regionses(data: {first: $first}) {
    edges {
      node {
        id
        json
        publishedAt
        updatedAt
      }
    }
    totalCount
  }
  stats: statses(data: {first: $first}) {
    edges {
      node {
        id
        json
        publishedAt
        updatedAt
      }
    }
    totalCount
  }
}
    `;
export const StatsDocument = gql`
    query Stats($data: Demo_rpg_dataGetStatsesInput) {
  statses(data: $data) {
    edges {
      cursor
      node {
        id
        versionId
        createdAt
        publishedAt
        data {
          abbreviation
          code
          description {
            en
            ru
            zh
          }
          name {
            en
            ru
            zh
          }
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
    totalCount
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    Abilities(variables?: AbilitiesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<AbilitiesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AbilitiesQuery>({ document: AbilitiesDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'Abilities', 'query', variables);
    },
    Classes(variables?: ClassesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<ClassesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ClassesQuery>({ document: ClassesDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'Classes', 'query', variables);
    },
    Dialogs(variables?: DialogsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<DialogsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DialogsQuery>({ document: DialogsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'Dialogs', 'query', variables);
    },
    Effects(variables?: EffectsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<EffectsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<EffectsQuery>({ document: EffectsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'Effects', 'query', variables);
    },
    FactionDetail(variables: FactionDetailQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<FactionDetailQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<FactionDetailQuery>({ document: FactionDetailDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'FactionDetail', 'query', variables);
    },
    Factions(variables?: FactionsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<FactionsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<FactionsQuery>({ document: FactionsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'Factions', 'query', variables);
    },
    BlogPosts(variables?: BlogPostsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<BlogPostsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<BlogPostsQuery>({ document: BlogPostsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'BlogPosts', 'query', variables);
    },
    BlogPostBySlug(variables?: BlogPostBySlugQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<BlogPostBySlugQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<BlogPostBySlugQuery>({ document: BlogPostBySlugDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'BlogPostBySlug', 'query', variables);
    },
    HeroDetail(variables: HeroDetailQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<HeroDetailQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<HeroDetailQuery>({ document: HeroDetailDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'HeroDetail', 'query', variables);
    },
    Heroes(variables?: HeroesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<HeroesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<HeroesQuery>({ document: HeroesDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'Heroes', 'query', variables);
    },
    ItemTypes(variables?: ItemTypesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<ItemTypesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ItemTypesQuery>({ document: ItemTypesDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'ItemTypes', 'query', variables);
    },
    ItemDetail(variables: ItemDetailQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<ItemDetailQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ItemDetailQuery>({ document: ItemDetailDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'ItemDetail', 'query', variables);
    },
    Items(variables?: ItemsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<ItemsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ItemsQuery>({ document: ItemsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'Items', 'query', variables);
    },
    ItemsPage(variables?: ItemsPageQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<ItemsPageQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ItemsPageQuery>({ document: ItemsPageDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'ItemsPage', 'query', variables);
    },
    LocationDetail(variables: LocationDetailQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<LocationDetailQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<LocationDetailQuery>({ document: LocationDetailDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'LocationDetail', 'query', variables);
    },
    Locations(variables?: LocationsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<LocationsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<LocationsQuery>({ document: LocationsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'Locations', 'query', variables);
    },
    LocationRegionOptions(variables?: LocationRegionOptionsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<LocationRegionOptionsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<LocationRegionOptionsQuery>({ document: LocationRegionOptionsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'LocationRegionOptions', 'query', variables);
    },
    MonsterDetail(variables: MonsterDetailQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<MonsterDetailQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<MonsterDetailQuery>({ document: MonsterDetailDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'MonsterDetail', 'query', variables);
    },
    Monsters(variables?: MonstersQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<MonstersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<MonstersQuery>({ document: MonstersDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'Monsters', 'query', variables);
    },
    MonsterFactionOptions(variables?: MonsterFactionOptionsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<MonsterFactionOptionsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<MonsterFactionOptionsQuery>({ document: MonsterFactionOptionsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'MonsterFactionOptions', 'query', variables);
    },
    NpcDetail(variables: NpcDetailQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<NpcDetailQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<NpcDetailQuery>({ document: NpcDetailDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'NpcDetail', 'query', variables);
    },
    Npcs(variables?: NpcsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<NpcsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<NpcsQuery>({ document: NpcsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'Npcs', 'query', variables);
    },
    NpcLocationOptions(variables?: NpcLocationOptionsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<NpcLocationOptionsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<NpcLocationOptionsQuery>({ document: NpcLocationOptionsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'NpcLocationOptions', 'query', variables);
    },
    Parties(variables?: PartiesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<PartiesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PartiesQuery>({ document: PartiesDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'Parties', 'query', variables);
    },
    PartyDetail(variables: PartyDetailQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<PartyDetailQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PartyDetailQuery>({ document: PartyDetailDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'PartyDetail', 'query', variables);
    },
    QuestDetail(variables: QuestDetailQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<QuestDetailQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<QuestDetailQuery>({ document: QuestDetailDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'QuestDetail', 'query', variables);
    },
    Quests(variables?: QuestsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<QuestsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<QuestsQuery>({ document: QuestsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'Quests', 'query', variables);
    },
    QuestLocationOptions(variables?: QuestLocationOptionsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<QuestLocationOptionsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<QuestLocationOptionsQuery>({ document: QuestLocationOptionsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'QuestLocationOptions', 'query', variables);
    },
    QuestNpcOptions(variables?: QuestNpcOptionsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<QuestNpcOptionsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<QuestNpcOptionsQuery>({ document: QuestNpcOptionsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'QuestNpcOptions', 'query', variables);
    },
    RegionDetail(variables: RegionDetailQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<RegionDetailQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<RegionDetailQuery>({ document: RegionDetailDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'RegionDetail', 'query', variables);
    },
    Regions(variables?: RegionsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<RegionsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<RegionsQuery>({ document: RegionsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'Regions', 'query', variables);
    },
    SearchPage(variables: SearchPageQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<SearchPageQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<SearchPageQuery>({ document: SearchPageDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'SearchPage', 'query', variables);
    },
    Stats(variables?: StatsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<StatsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<StatsQuery>({ document: StatsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'Stats', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;