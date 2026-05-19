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

export type ClassesQueryVariables = Exact<{
  data?: InputMaybe<Demo_Rpg_DataGetClassesesInput>;
}>;


export type ClassesQuery = { classeses: { totalCount: number, edges: Array<{ cursor: string, node: { id: string, versionId: string, createdAt: number | string, publishedAt: number | string, data: { base_hp: number, hp_per_level: number, mp_per_level: number, primary_stat: string, name: { en: string, ru: string, zh: string }, description: { en: string, ru: string, zh: string } } } }>, pageInfo: { endCursor?: string | null, hasNextPage: boolean } } };

export type LocationsQueryVariables = Exact<{
  data?: InputMaybe<Demo_Rpg_DataGetLocationsesInput>;
}>;


export type LocationsQuery = { locationses: { totalCount: number, edges: Array<{ cursor: string, node: { id: string, versionId: string, createdAt: number | string, publishedAt: number | string, data: { kind: string, coordinates: { x: number, y: number }, description: { en: string, ru: string, zh: string }, gallery: Array<{ fileId: string, fileName: string, hash: string, height: number, mimeType: string, url: string, width: number }>, map: { fileId: string, fileName: string, hash: string, height: number, mimeType: string, url: string, width: number }, name: { en: string, ru: string, zh: string }, region_id: { id: string, data: { climate: string, name: { en: string, ru: string, zh: string } } } } } }>, pageInfo: { endCursor?: string | null, hasNextPage: boolean } } };

export type LocationRegionOptionsQueryVariables = Exact<{
  data?: InputMaybe<Demo_Rpg_DataGetRegionsesInput>;
}>;


export type LocationRegionOptionsQuery = { regionses: { edges: Array<{ node: { id: string, data: { climate: string, name: { en: string, ru: string, zh: string } } } }>, pageInfo: { endCursor?: string | null, hasNextPage: boolean } } };

export type RegionDetailQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type RegionDetailQuery = { regions: { id: string, versionId: string, createdAt: number | string, publishedAt: number | string, data: { climate: string, cover_image: { fileId: string, fileName: string, hash: string, height: number, mimeType: string, url: string, width: number }, name: { en: string, ru: string, zh: string }, description: { en: string, ru: string, zh: string } } } };

export type RegionsQueryVariables = Exact<{
  data?: InputMaybe<Demo_Rpg_DataGetRegionsesInput>;
}>;


export type RegionsQuery = { regionses: { totalCount: number, edges: Array<{ cursor: string, node: { id: string, versionId: string, createdAt: number | string, publishedAt: number | string, data: { climate: string, cover_image: { fileId: string, fileName: string, hash: string, height: number, mimeType: string, url: string, width: number }, name: { en: string, ru: string, zh: string }, description: { en: string, ru: string, zh: string } } } }>, pageInfo: { endCursor?: string | null, hasNextPage: boolean } } };


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

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    Classes(variables?: ClassesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<ClassesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ClassesQuery>({ document: ClassesDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'Classes', 'query', variables);
    },
    Locations(variables?: LocationsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<LocationsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<LocationsQuery>({ document: LocationsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'Locations', 'query', variables);
    },
    LocationRegionOptions(variables?: LocationRegionOptionsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<LocationRegionOptionsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<LocationRegionOptionsQuery>({ document: LocationRegionOptionsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'LocationRegionOptions', 'query', variables);
    },
    RegionDetail(variables: RegionDetailQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<RegionDetailQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<RegionDetailQuery>({ document: RegionDetailDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'RegionDetail', 'query', variables);
    },
    Regions(variables?: RegionsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<RegionsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<RegionsQuery>({ document: RegionsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'Regions', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;