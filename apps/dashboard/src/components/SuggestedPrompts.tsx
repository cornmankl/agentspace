import { useState } from 'react';
import { promptTemplates, promptCategories, getTemplatesByCategory, PromptTemplate } from '../utils/promptTemplates';

interface SuggestedPromptsProps {
  onSelectPrompt: (template: PromptTemplate) => void;
}

export function SuggestedPrompts({ onSelectPrompt }: SuggestedPromptsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = Object.entries(promptCategories);
  
  const filteredTemplates = selectedCategory 
    ? getTemplatesByCategory(selectedCategory)
    : searchQuery 
      ? promptTemplates.filter(t => 
          t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : promptTemplates;

  return (
    <div className="prompt-container">
      <div className="prompt-header" style={{ marginBottom: '20px' }}>
        <h3>⚡ Quick Actions</h3>
        <p>Choose from suggested prompts or search for specific actions</p>
      </div>

      <div className="prompt-search" style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="🔍 Search prompts... (e.g., 'debug', 'analyze', 'write')"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setSelectedCategory(null);
          }}
        />
      </div>

      <div className="prompt-categories">
        <button
          onClick={() => {
            setSelectedCategory(null);
            setSearchQuery('');
          }}
          className="prompt-category-btn"
          style={{
            backgroundColor: !selectedCategory && !searchQuery ? '#3b82f6' : '#f1f5f9',
            color: !selectedCategory && !searchQuery ? '#fff' : '#475569',
          }}
        >
          All
        </button>
        {categories.map(([key, cat]) => (
          <button
            key={key}
            onClick={() => {
              setSelectedCategory(key);
              setSearchQuery('');
            }}
            className="prompt-category-btn"
            style={{
              backgroundColor: selectedCategory === key ? cat.color : '#f1f5f9',
              color: selectedCategory === key ? '#fff' : '#475569',
            }}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      <div className="prompt-card-grid">
        {filteredTemplates.map((template) => {
          const category = promptCategories[template.category as keyof typeof promptCategories];
          return (
            <button
              key={template.id}
              onClick={() => onSelectPrompt(template)}
              className="prompt-card"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = category.color;
                e.currentTarget.style.backgroundColor = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.backgroundColor = '#f8fafc';
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: category.color,
                }}
              />

              <div style={{ fontSize: '24px', marginBottom: '8px' }}>{template.icon}</div>

              <div
                style={{
                  fontSize: '15px',
                  fontWeight: 600,
                  marginBottom: '6px',
                  color: '#1e293b',
                }}
              >
                {template.title}
              </div>

              <div
                style={{
                  fontSize: '13px',
                  color: '#64748b',
                  lineHeight: '1.4',
                  marginBottom: '12px',
                }}
              >
                {template.description}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {template.capabilities.slice(0, 3).map((cap, idx) => (
                  <span
                    key={idx}
                    className="prompt-tag"
                    style={{ backgroundColor: `${category.color}20`, color: category.color }}
                  >
                    {cap}
                  </span>
                ))}
              </div>
            </button>
          );
        })}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="prompt-empty">
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔍</div>
          <div style={{ fontSize: '16px', fontWeight: 500, marginBottom: '4px' }}>No prompts found</div>
          <div style={{ fontSize: '14px' }}>Try adjusting your search or category filter</div>
        </div>
      )}

      <div className="prompt-footer">
        <div>Showing {filteredTemplates.length} of {promptTemplates.length} prompts</div>
        <div>💡 Click any card to create task instantly</div>
      </div>
    </div>
  );
}
